new (class SoundBoard{
	
	constructor(){
		this.library = null;
		this.loadSoundboard();
	}
	
	async loadSoundboard(){
		await this.loadLibrary();
		await this.loadUI();
	}
	
	async loadUI(){
		const container = document.getElementById('soundboard-container');
		this.library.forEach(clip=>{
			const col = document.createElement('div');
			col.classList.add('col');
			container.appendChild(col);
			var button = document.createElement('button');
			button.classList.add('btn', 'btn-primary', 'play-btn');
			button.innerHTML = `<div class="btn-text"><i class="far fa-play-circle"></i> ${clip.name}</div>`;
			col.appendChild(button);
			button.addEventListener('click', e=>{
				e.preventDefault();
				clip.play();
			});
		});
	}
	
	async loadLibrary(){
		const data = await fetch("./data/clips.json").then(data=>data.json());
		const promises = data.map((clip, index)=>{
			const audio = new Audio(`./audio/${clip.file}`);
			data[index].play = ()=>audio.play();
			return new Promise(done=>{
				audio.addEventListener("canplaythrough", e=>done())
			});
		});
		await Promise.all(promises);
		this.library = data;
	}
	
});


