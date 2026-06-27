const supabaseUrl =
"https://nsyhconcqsqueydhhheu.supabase.co";

const supabaseKey =
"sb_publishable_fFIEmCXZdk20izLCpWV7bg_ijCj0sHQ";

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

if (data.length === 0) {
  pollsContainer.innerHTML = `
    <div class="poll-card">
      <h3>No polls yet.</h3>
      <p>Be the first fan to create a poll! 🎉</p>
    </div>
  `;
  return;
}

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

let currentUser = null;

async function getCurrentUser() {
  const { data, error } = await client.auth.getSession();

  if (error) {
    console.log(error);
    return;
  }

  if (data.session) {
    currentUser = data.session.user;
  } else {
    alert("Please login first.");
    window.location.href = "Login.html";
  }
}

(async () => {
  await getCurrentUser();
  await loadPolls();
})();
