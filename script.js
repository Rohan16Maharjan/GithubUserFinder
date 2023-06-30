const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const content = document.querySelector('.content');

const repos_container = document.querySelector('.rep');
const repost = document.querySelector('.rep-1');

// function
async function users(username) {
	const fet = await fetch(`https://api.github.com/users/${username}`);
	const resp = await fet.json();
	return resp;
}

// function for adding repos
async function repos(username) {
	const resp = await fetch(`https://api.github.com/users/${username}/repos`);
	const respData = await resp.json();
	return respData;
}

// the JSON output is on array format
async function add_repos() {
	const repost = await repos(input.value);
	repos_container.innerHTML = '';
	for (const repo of repost) {
		const html = `
    <div class="rep-1">
      <h4>${repo.name}</h4>
      <a href="${repo.clone_url}" target="_blank" >Take a look at this repo ></a>
    </div>
  `;
		repos_container.innerHTML = html + repos_container.innerHTML;
	}
}

// if btn is clicked
btn.addEventListener('click', async () => {
	const inputValue = input.value;
	const user = await users(inputValue);
	add_repos();
	// if user is not found
	if (!user.login) {
		alert('No user found!!');
	} else {
		content.innerHTML = `	<div class="avatar">
    <img src="${user.avatar_url}" width="90" height="90" alt="img" />
  </div>
  <div class="names">
    <h2>${user.name}</h2>
    <p>${user.login}</p>
  </div>
  <div class="stuffs">
    <div class="followers flexing">
      <h4>Followers</h4>
      <p>${user.followers}</p>
    </div>
    <div class="following flexing">
      <h4>Following</h4>
      <p>1${user.following}</p>
    </div>
  </div>
  <div class="stuffs">
    <div class="Repos flexing">
      <h4>Repos</h4>
      <p>${user.public_repos}</p>
    </div>
    <div class="location flexing">
      <h4>
        <i class="fa-solid fa-location-dot" style="color: #ffffff"></i>
      </h4>
      <p>${user.location}</p>
    </div>
  </div>
  <a href="${user.html_url}" target="_blank" >
Visit Github Profile  </a>`;
	}
});
