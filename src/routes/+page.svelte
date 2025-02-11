<script lang="ts">
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import InputBar from '$lib/components/InputBar.svelte';
  import Button from '$lib/components/Button.svelte';

  let messages: { text: string, isAssistant: boolean }[] = []; // Array to store chat messages
  let isSpeaking = false;

  // Function to handle sending a text message
  async function sendMessage(text: string) {
    if (!text.trim()) return; // Ignore empty messages

    // Add user's message to the chat
    messages = [...messages, { text, isAssistant: false }];

    // Send the message to the assistant API
    const response = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    const reply = data.reply;

    // Add assistant's reply to the chat
    messages = [...messages, { text: reply, isAssistant: true }];
  }

  // Function to handle voice input
  async function startVoiceInput() {
    isSpeaking = true;
    const audio = await recordAudio();

    // Send the recorded audio to the speech-to-text API
    const response = await fetch('/api/speech-to-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio }),
    });

    const data = await response.json();
    const transcription = data.transcription;

    if (transcription) {
      sendMessage(transcription); // Send the transcribed text as a message
    }

    isSpeaking = false;
  }

  // Function to record audio
  async function recordAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1]); // Return base64 data
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // Stop after 5 seconds.
    });
  }
</script>

<div class="chat-container">
  <!-- Display chat messages -->
  {#each messages as message}
    <ChatMessage text={message.text} isAssistant={message.isAssistant} />
  {/each}

  <!-- Input bar for text and voice input -->
  <InputBar onSend={sendMessage} onVoice={startVoiceInput} />

  <!-- Voice input status -->
  {#if isSpeaking}
    <div class="voice-status">Listening...</div>
  {/if}
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .voice-status {
    text-align: center;
    color: #666;
  }
</style>
