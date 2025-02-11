<script>
    export let text;
    export let isAssistant = false;
  </script>
  
  <div class:assistant={isAssistant}>
    {text}
  </div>
  
  <style>
    .assistant {
      color: blue;
    }
  </style>
  