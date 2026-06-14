const supabaseUrl =
"https://nsyhconcqsqueydhhheu.supabase.co";

const supabaseKey =
"sb_publishable_fFIEmCXZdk20izLCpWV7bg_ijCj0sHQ";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

const chatArea =
document.getElementById("chatArea");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");

async function loadMessages() {

  const { data, error } = await client
    .from("community_messages")
    .select("*")
    .order("created_at", { ascending: true });

  if(error){
    console.log(error);
    return;
  }

  chatArea.innerHTML = "";

  data.forEach(msg => {

    chatArea.innerHTML += `
      <div class="message">
        <div class="name">
          ${msg.display_name}
        </div>
        ${msg.message}
      </div>
    `;
  });

  chatArea.scrollTop =
  chatArea.scrollHeight;
}

sendBtn.onclick = async () => {

  const text =
  messageInput.value.trim();

  if(!text) return;

  const {
    data: { user }
  } = await client.auth.getUser();

  if(!user){
    alert("Please login first");
    return;
  }

  await client
    .from("community_messages")
    .insert([{
      user_id: user.id,
      display_name: user.email,
      country: "Unknown",
      message: text
    }]);

  messageInput.value = "";

  loadMessages();
};

loadMessages();

setInterval(loadMessages, 3000);
