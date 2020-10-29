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
		var promises = data.map((clip, index)=>{
			return new Promise(async done=>{
				var dataUri = await this.getAudioDataURL(`./audio/${clip.file}`);
				const audio = new Audio(dataUri);
				data[index].play = () => audio.play();
				done();
			});
		});
		await Promise.all(promises);
		this.library = data;
	}
	
	
	getAudioDataURL(src){
		return new Promise(async d=>{
			var blob = await fetch(src).then(r=>r.blob());
			var reader =  new FileReader();
			reader.addEventListener("load", ()=>{
				d(reader.result);
			});
			reader.readAsDataURL(blob);
		});
	}
});


