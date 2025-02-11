<script>
    export let onClick; // Function to call when clicked
    export let label; // Button text
  </script>
  
  <button on:click={onClick} class="styled-button">
    {label}
  </button>
  
  <style>
    .styled-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #28a745;
      color: white;
      cursor: pointer;
    }
  
    .styled-button:hover {
      background-color: #218838;
    }
  </style>
  