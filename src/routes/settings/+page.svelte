<script>
    let apiKey = '';
  
    function saveApiKey() {
      // Save API key to localStorage or database
      localStorage.setItem('apiKey', apiKey);
    }
  </script>
  
  <div>
    <h1>Settings</h1>
    <input bind:value={apiKey} placeholder="Enter your OpenAI API key" />
    <button on:click={saveApiKey}>Save</button>
  </div>
  