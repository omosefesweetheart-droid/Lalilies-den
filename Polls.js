const supabaseUrl =
"https://nsyhconcqsqueydhhheu.supabase.co";

const supabaseKey =
"YOUR_PUBLISHABLE_KEY";

const { createClient } = supabase;
const client = createClient(
  supabaseUrl,
  supabaseKey
);

async function loadPolls() {

  const { data, error } = await client
    .from("polls")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if(error){
    alert(error.message);
    return;
  }

  const pollsContainer =
  document.getElementById("pollsContainer");

  pollsContainer.innerHTML = "";

  data.forEach(poll => {

    pollsContainer.innerHTML += `
      <div class="poll-card">
        <h3>${poll.question}</h3>

        <button>${poll.option1}</button>
        <button>${poll.option2}</button>

        ${
          poll.option3
          ? `<button>${poll.option3}</button>`
          : ""
        }

        ${
          poll.option4
          ? `<button>${poll.option4}</button>`
          : ""
        }
      </div>
    `;
  });
}

loadPolls();
