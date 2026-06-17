const supabaseUrl =
"https://nsyhconcqsqueydhhheu.supabase.co";

const supabaseKey =
"sb_publishable_fFIEmCXZdk20izLCpWV7bg_ijCj0sHQ";

const { createClient } = supabase;

const client =
createClient(
supabaseUrl,
supabaseKey
);

async function loadPolls(){

const { data, error } =
await client
.from("polls")
.select("*")
.order("created_at",
{ ascending:false });

const container =
document.getElementById(
"pollsContainer"
);

if(error){
container.innerHTML =
error.message;
return;
}

container.innerHTML = "";

if(data.length === 0){
container.innerHTML =
"No polls yet.";
return;
}

data.forEach(poll => {

container.innerHTML += `
<div class="poll">

<h3>${poll.question}</h3>

<div class="option">
${poll.option1}
</div>

<div class="option">
${poll.option2}
</div>

${poll.option3 ?
`<div class="option">${poll.option3}</div>` : ""}

${poll.option4 ?
`<div class="option">${poll.option4}</div>` : ""}

</div>
`;

});

}

loadPolls();
