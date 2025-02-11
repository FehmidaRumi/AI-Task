<script>
    export let placeholder = 'Type your message...';
    export let onSend; // Function to call when sending a message
    export let onVoice; // Function to call when starting voice input
  
    let inputText = '';
  
    function handleSend() {
      onSend(inputText);
      inputText = '';
    }
  </script>
  
  <div class="input-bar">
    <input bind:value={inputText} {placeholder} />
    <button on:click={handleSend}>Send</button>
    <button on:click={onVoice}>🎤</button>
  </div>
  
  <style>
    .input-bar {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      background-color: #f8f9fa;
    }
  
    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
    }
  
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  