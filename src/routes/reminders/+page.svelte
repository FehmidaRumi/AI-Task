<script>
    /** @type {{ text: string }[]} */
    let reminders = [];
  
    async function fetchReminders() {
      // Fetch reminders from the database
      const response = await fetch('/api/reminders');
      reminders = await response.json();
    }
  
    fetchReminders();
  </script>
  
  <div>
    <h1>Reminders</h1>
    <ul>
      {#each reminders as reminder}
        <li>{reminder.text}</li>
      {/each}
    </ul>
  </div>
  