// Source Kode by L-M0/not-Found//
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const imgbb = ('imgbb-uploader')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const lolis = require('lolis.life')
const loli = new lolis()
const imageToBase64 = require('image-to-base64')
const genshin = require('genshin-impact-api')
const brainly = require('brainly-scraper')
const { BarBarApi, ZeksApi, TechApi, TobzApi, ItsApi, VthearApi, Lolapi, Naufal} = JSON.parse(fs.readFileSync('./database/json/apikey.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const adminNumber = JSON.parse(fs.readFileSync('./src/admin.json'))
const anime = JSON.parse(fs.readFileSync('./src/anime.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const { removeBackgroundFromImageFile } = require('remove.bg')
const vcard = 'BEGIN:VCARD\n' // jangan diubah
            + 'VERSION:3.0\n' // ini juga jangan diubah
            + 'HARDI-ANTO[THE OWNER]\n' // ganti nama lu
            + 'ORG:ERROR 404 NOT FOUND;\n' // kasih bio wa lu
            + 'TEL;type=CELL;type=VOICE;waid=6287811078485:+62 878-1107-8485\n' // ganti ke nomor lu
            + 'END:VCARD'
prefix = '-' // ganti simbol nya sesuka hati
blocked = ['601162331191@s.whatsapp.net'] 

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})
	client.on('credentials-updated', () => {
		fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Info Updated')
	})
	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/ry7DqQX/Squad-404-not-found-gfl-botwa-team.jpg'
				}
				teks = `*Welcome to the* \n *${mdata.subject}* group ...... *please introduce new member* \n⌦ 𝐢𝐧𝐭𝐫𝐨 @${num.split('@')[0]}  \n│\n┢⋗ 𝒏𝒂𝒎𝒆  : \n┣⋗ 𝒂𝒈𝒆      :  \n┗⋗ 𝒈𝒆𝒏𝒅𝒆𝒓 : \n`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/ry7DqQX/Squad-404-not-found-gfl-botwa-team.jpg'
				}
				teks = `さよなら`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'SLpvUgOcMYwIx0pFeELt'
			const insom = from.endsWith('@g.us')
			const nameReq = insom ? mek.participant : mek.key.remoteJid
			pushname2 = client.contacts[nameReq] != undefined ? client.contacts[nameReq].vname || client.contacts[nameReq].notify : undefined
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const speed = require('performance-now')
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const auto = budy.toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			client.chatRead (from)
			
			mess = {
				wait: '[ ⌛ ]  Sedang di Prosess mohon bersabar dan jangan spam',
				success: 'Berhasil ✔️',
				error: {
					stick: 'Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker',
					Iv: 'Link tidak valid'
				},
				only: {
					group: 'Perintah ini hanya bisa di gunakan dalam group!',
					ownerG: 'Perintah ini hanya bisa di gunakan oleh owner group!',
					ownerB: 'Perintah ini hanya bisa di gunakan oleh owner bot!',
					admin: 'Perintah ini hanya bisa di gunakan oleh admin group!',
					Badmin: 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin!',
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["6287811078485@s.whatsapp.net"] // replace this with your number
			const adminbotnumber = ["6287811078485@s.whatsapp.net"] // ganti nomor lu atau temen lu
			const frendsowner = ["6287811078485@s.whatsapp.net"] // ganti juga sama dengan yg diatas
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isAnime = isGroup ? anime.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isadminbot = adminbotnumber.includes(sender)
			const isfrendsowner = frendsowner.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
            const sendPtt = (teks) => {
		        client.sendMessage(from, audio, mp3, {quoted:mek})
		        }
		if (messagesC.includes("://chat.whatsapp.com/")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`Group link detected sorry $ {sender.split("@")[0]} you will be kicked out of the group for another 5 seconds`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1detik")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2detik")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3detik")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4detik")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5detik")
		}, 0)
	}
	if (auto.match('bot')){
		const nani = fs.readFileSync('./src/assets/nani.mp3');
        client.sendMessage(from, nani, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
		}
		if (auto.match('ohayo')){
		const irimp3 = fs.readFileSync('./src/assets/ohayo.mp3');
        client.sendMessage(from, irimp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
		}
		if (auto.match('ara ara')){
		const mi = ['https://download1507.mediafire.com/am871rs4xopg/zwoyudy2trmpsew/araara6.mp3','https://download1337.mediafire.com/7hf80q6b4bgg/qd6rc7qqy8whtnd/araara5.mp3','https://download1591.mediafire.com/95muzt0524eg/dn6s864f3rn84q5/araara4.mp3','https://download1350.mediafire.com/gifwst91kg7g/le2kpmeoi3galu8/araara3.mp3','https://download1514.mediafire.com/zncibjzdt7tg/eh1oe587ejw3u8d/araara2.mp3','https://download1512.mediafire.com/49avtuac50bg/trrcuht37p0e5mg/araara1.mp3','https://download938.mediafire.com/rckdo6m0zkxg/njj99c2vrl27bl0/AraAra.mp3']
		const su = mi[Math.floor(Math.random() * mi.length)];
		buf = await getBuffer(su)
		client.sendMessage(from, buf, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
		}
		if (auto.match('jancok')){
		const irimp3 = fs.readFileSync('./src/assets/sayjancok.mp3');
        client.sendMessage(from, irimp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
		}
		function addMetadata(packname, author) {	
				if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
		
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
		    case 'help':
			case 'menu':
			    anu = await fetchJson(`https://videfikri.com/api/covidindo/`, {method: 'get'})
			  const positif =`${anu.result.positif}`
			  const meninggal = `${anu.result.meninggal}`
			  const sembuh = `${anu.result.sembuh}`
			  const perawatan = `${anu.result.dalam_perawatan}`
				uptime = process.uptime()
				myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
                myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
                var tgl = new Date();
                var day = tgl.getDate()
                  bulan = tgl.getMonth()
                var thisDay = tgl.getDay(),
                thisDay = myDays[thisDay];
                var yy = tgl.getYear()
                var year = (yy < 1000) ? yy + 1900 : yy;
                const tanggal = `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
					client.sendMessage(from, help(prefix, uptime, jam, tanggal, positif, meninggal, sembuh, perawatan), text, {
					contextInfo: {
					participant: '0@s.whatsapp.net',
					quotedMessage: {
					conversation: '*_L-M0_*'
					}
					}
					})
    				break
             case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Name* : ${me.name}\n \n*OWNER* : *L-M0*\n*AUTHOR* : L-Mo\n *github* : *https://github.com/L-M0* \n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
			case 'nightcore':



	if (!isQuotedAudio) return reply('Reply audio nya om')

					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					media = await client.downloadAndSaveMediaMessage(encmedia)

					ran = getRandom('.mp3')

					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {

						fs.unlinkSync(media)

						if (err) return reply('Error!')

						hah = fs.readFileSync(ran)

						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:false, quoted: mek,duration:99999999999})

						fs.unlinkSync(ran)

					})

				break
			case 'blocklist':
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja cuk')
					}
					break
				
				case 'stiker':
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.erronhstick)
								buff = fs.readFileSync(ranw)
								client.sendMessage(from, buff, sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
			case 'owner':
                 client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { participant: '447990653714@s.whatsapp.net', quotedMessage: { conversation: '*_GFL BOT OWNERZ_*' } }) 
                 client.sendMessage(from, 'OWNER BOT NOT FOUND',MessageType.text, { quoted: mek} )
                 tod = await getBuffer(`https://www.hostpic.org/images/2102221912450310.jpg`)
                 client.sendMessage(from, tod, image, { contextInfo: { participant: '447990653714@s.whatsapp.net', quotedMessage: { conversation: '*_can`t find the owner bot_*' } } }) 
                 break
                 case 'fitnah':
                	if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
				    var gh = body.slice(8)
				    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("|")[0];
					var target = gh.split("|")[1];
					var bot = gh.split("|")[2];
					client.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
				case 'infogc':
				client.updatePresence(from, Presence.composing)
				if (!isGroup) return reply(mess.only.group)
					try {
					ppimg = await client.getProfilePicture(from)
				} catch {
					ppimg = 'https://i.ibb.co/NthF8ds/IMG-20201223-WA0740.jpg'
				}
					let buf = await getBuffer(ppimg)
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `*Nama grup :* ${groupName}\n*Deskripsi :* ${groupDesc}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Member :* ${groupMembers.length}`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}]`
					}
					client.sendMessage(from, buf, image, {quoted: mek, caption: teks})
					break
				case 'groupinfo':
                client.updatePresence(from, Presence.composing)
                if (!isGroup) return reply(mess.only.group)
                ppUrl = await client.getProfilePicture(from) // leave empty to get your own
			    buffer = await getBuffer(ppUrl)
		        client.sendMessage(from, buffer, image, {quoted: mek, caption: `*NAME* : ${groupName}\n*MEMBER* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESK* : ${groupDesc}`})
                break
                case 'battlefield4':
				    if (args.length < 1) return reply('Teksnya mana beb contoh ${prefix}battlefield4 text1| text2')
					var gh = body.slice(13)
					var gbl5 = gh.split("|")[0];
					var gbl6 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana beb')
					reply(mess.wait)
					buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/photooxy2/battlefield4/${gbl5}/${gbl6}?apikey=${Lolapi}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
                case 'instagram':
                reply(mess.wait)
				if (args.length < 1) return reply('Urlnya mana om?')
				lmo = body.slice(10)
				anu = await fetchJson(`https://naufalhoster.xyz/dl/instagram?apikey=${Naufal}&url=${lmo}`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				buffer = await getBuffer(anu.result[0].url)
				client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
				break
				case 'testime':
					setTimeout( () => {
					client.sendMessage(from, '100', text) // ur cods
					client.sendMessage(from, '50', text) // ur cods
					client.sendMessage(from, '60', text) // ur cods
					}, 10000) // 1000 = 1s,
					break
				case 'linkgroup':
				case 'linkgrup':
				case 'linkgc':
				    if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        break
			      case 'antilinkgrup':
			     case 'antilinkgroup':
                    if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('ketik 1 untuk mengaktifkan')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('anti link group sudah aktif')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Sukses mengaktifkan anti link group di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link group aktif apabila anda mengirim link group anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						if (isAntiLink) return reply('Mode anti link group sudah disable')
						var ini = anti.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Sukes menonaktifkan anti link group di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
					case 'hidetag':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('kamu siapa? kamu bukan pacarku')
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
				
				case 'block':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
               case 'unblock':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `perintah Diterima, membuka blokir ${body.slice(9)}@c.us`, text)
				    break
			    case 'brainly':
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '❉───────────❉\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────❉\n`
					}
					client.sendMessage(from, teks, text, {quoted: mek, detectLinks: false})
                        console.log(res)
                    })
					break
				case 'quotemaker':
					var gh = body.slice(12)
					var quote = gh.split("|")[0];
					var wm = gh.split("|")[1];
					var bg = gh.split("|")[2];
					const pref = `Usage: \n${prefix}quotemaker teks|watermark|theme\n\nEx :\n${prefix}quotemaker ini contoh|bicit|random`
					if (args.length < 1) return reply(pref)
					reply(mess.wait)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=${bg}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {caption: 'Nih beb', quoted: mek})
					break
				case 'cantik':
					membr = []
					const meo = groupMembers
					const msk = groupMembers
					const siaps = meo[Math.floor(Math.random() * meo.length)]
					const sips = pushname2[Math.floor(Math.random() * msk.length)]
					teks = `Yang paling Cantik disini Adalah : @${siaps.jid.split('@')[0]}`
					membr.push(siaps.jid)
					mentions(teks, membr, true)
					break
					case 'beban':
					membr = []
					const met = groupMembers
					const msd = groupMembers
					const siapsa = met[Math.floor(Math.random() * met.length)]
					const sipsd = pushname2[Math.floor(Math.random() * msd.length)]
					teks = `Yang paling Beban disini Adalah : @${siapsa.jid.split('@')[0]}`
					membr.push(sipsd.jid)
					mentions(teks, membr, true)
					break
					case 'siapakah':
					siapa = body.slice(9)
					membr = []
					const nus = groupMembers
					const siapss = nus[Math.floor(Math.random() * nus.length)]
					teks = `siapakah ${siapa} : @${siapss.jid.split('@')[0]}`
					membr.push(siapss.jid)
					mentions(teks, membr, true)
					break
					case 'jadian':
					jds = []
					const jdii = groupMembers
					const koss = groupMembers
					const akuu = jdii[Math.floor(Math.random() * jdii.length)]
					const diaa = koss[Math.floor(Math.random() * koss.length)]
					teks = `Ciee.. yang lagi jadian @${akuu.jid.split('@')[0]}  (♥️ ) @${diaa.jid.split('@')[0]} `
					jds.push(akuu.jid)
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break
                case 'phlogo':
					var gh = body.slice(7)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana sayang')
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/phlogo?text1=${gbl1}&text2=${gbl2}&apikey=vinzapi`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'img2url':
					reply(mess.wait)
            var encmedia  = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
            var media = await  client.downloadAndSaveMediaMessage(encmedia)
           var imgbb = require('imgbb-uploader')
            imgbb('55e7971b786836b9966eca4528210ba8', media)
                .then(data => {
                    var caps = `「 *IMAGE TO URL* 」\n\n*╠➥  ID :* ${data.id}\n*╠➥  MimeType :* ${data.image.mime}\n*╠➥  Extension :* ${data.image.extension}\n\n*╠➥  URL :* ${data.display_url}`
                    ibb = fs.readFileSync(media)
                     client.sendMessage(from, ibb, image, { quoted: mek, caption: caps })
                })
                .catch(err => {
                    throw err
                })
            	
            break  
				case 'primbonjodoh':
					var gh = body.slice(14)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					anu = await fetchJson(`https://api.vhtear.com/primbonjodoh?nama=${gbl1}&pasangan=${gbl2}&apikey=Jsieu8287362jshre82`)
					reply(anu.result.hasil)
					break
				case 'ramaljadian':
					var gh = body.slice(10)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					var gbl3 = gh.split("|")[2];
					anu = await fetchJson(`https://api.vhtear.com/harijadian?tgl=${gbl1}&bln=${gbl2}&thn=${gbl3}&apikey=Jsieu8287362jshre82`)
					reply(anu.result.hasil)
					break
				case 'code':
					if (args.length < 1) return reply(mess.blank)
					code = body.slice(5)
					reply(mess.wait)
					buriq = await getBuffer(`http://lolhuman.herokuapp.com/api/carbon?code=${code}&apikey=${Lolapi}`)
					client.sendMessage(from, buriq, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'narto':
					if (args.length < 1) return reply(mess.blank)
					telsst = body.slice(6)
					reply(mess.wait)
					buffer = await getBuffer(`https://videfikri.com/api/textmaker/narutobanner/?text=${telsst}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'breakwall':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(10)
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/breakwall?apikey=vinzapi&text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				 case 'bneon':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(6)
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/bneon?apikey=vinzapi&text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'pinterest2':
                     pin = body.slice(12)
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${pin}`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*⟪ PINTEREST ⟫*`})
					break 
				 case 'gneon':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(6)
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/gneon?apikey=vinzapi&text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'sandw':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(6)
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/sandw?apikey=vinzapi&text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				 case 'dropwater':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(10)
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/dropwater?apikey=vinzapi&text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				 
				case 'candy':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(6)
					reply(mess.wait)
					buffer = await getBuffer(`https://videfikri.com/api/textmaker/sweetcandy/?text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'coffe':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(6)
					reply(mess.wait)
					buffer = await getBuffer(`https://videfikri.com/api/textmaker/coffeecup/?text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				 case 'coffee':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(7)
					reply(mess.wait)
					buffer = await getBuffer(`https://videfikri.com/api/textmaker/coffeecup2/?text=${teks}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				
				case 'cmm':
					ling = body.slice(4)
					reply(mess.wait)
					anu = await fetchJson(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${ling}&raw=7`, {method: 'get'})
					buffer = await getBuffer(anu.message)
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'kanna':
					ling = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${ling}&raw=7`, {method: 'get'})
					buffer = await getBuffer(anu.message)
					client.sendMessage(from, buffer, image, {caption : 'NIH BANG',quoted: mek})
					break
				case 'tahta':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(6)
					if (teks.length > 9) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					buffer = await getBuffer(`https://api.zeks.xyz/api/hartatahta?text=${teks}&apikey=vinzapi`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Harta Tahta '+teks})
					break
				case 'bass':                 
                    if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'sand1':
              	   if (args.length < 1) return reply('teksnya mana kak?')
                     teks = body.slice(6)
                     if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, ', text, {quoted: mek})
                     reply(mess.wait)
                     buff = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/sandwriting/${teks}?apikey=${Lolapi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			      case 'sand2':
              	   if (args.length < 1) return reply('teksnya mana kak?')
                     teks = body.slice(6)
                     if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, ', text, {quoted: mek})
                     reply(mess.wait)
                     buff = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/sandsummer/${teks}?apikey=${Lolapi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			     case 'halloween':
              	   if (args.length < 1) return reply('teksnya mana kak?')
                     teks = body.slice(10)
                     reply(mess.wait)
                     buff = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/halloween/${teks}?apikey=${Lolapi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			     case 'gelas1':
              	   if (args.length < 1) return reply('teksnya mana kak?')
                     teks = body.slice(7)
                     reply(mess.wait)
                     buff = await getBuffer(`http://lolhuman.herokuapp.com/api/photooxy1/cup/${teks}?apikey=${Lolapi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			      case 'gelas2':
              	   if (args.length < 1) return reply('teksnya mana kak?')
                     teks = body.slice(7)
                     reply(mess.wait)
                     buff = await getBuffer(`http://lolhuman.herokuapp.com/api/photooxy1/cup1/${teks}?apikey=${Lolapi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			      case 'romance':
              	   if (args.length < 1) return reply('teksnya mana kak?')
                     teks = body.slice(8)
                     reply(mess.wait)
                     buff = await getBuffer(`http://lolhuman.herokuapp.com/api/photooxy1/romance/${teks}?apikey=${Lolapi}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			    case '8bit':
                      if (args.length < 1) return reply('teksnya mana')
					if (args.length < 2) return reply('teksnya mna')
					 gh = body.slice(5)
					mo = gh.split("|")[0];
                    lo = gh.split("|")[1];
                    hasil = await getBuffer(`https://videfikri.com/api/textmaker/8bit/?text1=${mo}&text2=${lo}`, {method: 'get'})
                    client.sendMessage(from, hasil, image, {quoted: mek, caption: 'neh...'})
                    break
                   case 'epep':
					if (args.length < 1) return reply(mess.blank)
					tels = body.slice(5)
					if (tels.ength > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					buff = await getBuffer(`https://api.zeks.xyz/api/epep?text=VINZ&apikey=apivinz`, {method: 'get'})
					client.sendMessage(from, buff, image, {quoted: mek})
					break
			  case 'bplogo':
					if (args.length < 1) return reply(mess.blank)
					tels = body.slice(7)
					if (tels.ength > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					buff = await getBuffer(`https://api.zeks.xyz/api/logobp?text=${tels}&apikey=vinzapi`, {method: 'get'})
					client.sendMessage(from, buff, image, {quoted: mek})
					break
		         case 'wolflogo':
                      if (args.length < 1) return reply('Teks nya mana?')
                      gh = body.slice(9)
                      gl1 = gh.split("|")[0];
                      gl2 = gh.split("|")[1];
                      reply(mess.wait)
                      buff = await getBuffer(`https://api.zeks.xyz/api/wolflogo?apikey=vinzapi&text1=${gl1}&text2=${gl2}`, {method: 'get'})
                      client.sendMessage(from, buff, image, {quoted: mek})
                      break
                   case '3dbox':
                      if (args.length < 1) return reply('textnya mna?')
                      gh = body.slice(6)
                      reply(mess.wait)
                      buff = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/box3d/${gh}?apikey=${Lolapi}`, {method: 'get'})
                      client.sendMessage(from, buff, image, {quoted: mek})
                      break
                  case 'road':
                      if (args.length < 1) return reply('textnya mna?')
                      gh = body.slice(5)
                      reply(mess.wait)
                      buff = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/roadwarning/${gh}?apikey=${Lolapi}`, {method: 'get'})
                      client.sendMessage(from, buff, image, {quoted: mek})
                      break
                  case 'ice':
                      if (args.length < 1) return reply('textnya mna?')
                      gh = body.slice(4)
                      reply(mess.wait)
                      buff = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/icecold/${gh}?apikey=${Lolapi}`, {method: 'get'})
                      client.sendMessage(from, buff, image, {quoted: mek})
                      break
                 case 'leave': 
				    if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
			    	anu = await client.groupLeave(from, '𝗕𝘆𝗲𝗲', groupId)
	                break
	             case 'setname':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Nama Grup', text, {quoted: mek})
                break
                case 'setdesc':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Deskripsi Grup', text, {quoted: mek})
                break
				case 'tts':
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana beb?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana yank', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan sayang')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal sayang:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'setpp':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply('Sukses mengganti icon Grup')
                    break                 
                case 'apakah':
					apakah = body.slice(1)
					const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi','gak tau :v','knp tanya gw dah','menurut lu']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: mek })
					break
				case 'rate':
					rate = body.slice(1)
					const ra =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'%', text, { quoted: mek })
					break
				case 'watak':
					watak = body.slice(1)
					const wa =['penyayang','pemurah','Pemarah','Pemaaf','Penurut','Baik','baperan','Baik Hati','penyabar','Uwu','top deh, pokoknya','Suka Membantu','pemarah','pemalas','rajin']
					const tak = wa[Math.floor(Math.random() * wa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: mek })
					break
				case 'hobby':
					hobby = body.slice(1)
					const hob =['Memasak','Membantu Atok','Mabar','Nobar','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri','ngegay','ngelesbi','coli','nonton b0kep','nyepam bot','ewe ayam','ewe kambing','wik wik bareng owner','wik wik sama admin','liat kakak mandi']
					const by = hob[Math.floor(Math.random() * hob.length)]
					client.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: mek })
					break 
				case 'gantengcek':
					ganteng = body.slice(1)
					const gan =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+ganteng+'*\n\nJawaban : '+ teng+'%', text, { quoted: mek })
					break
					case 'cantikcek':
					cantik = body.slice(1)
					const can =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const tik = can[Math.floor(Math.random() * can.length)]
					client.sendMessage(from, 'Pertanyaan : *'+cantik+'*\n\nJawaban : '+ tik+'%', text, { quoted: mek })
					break
				case 'bisakah':
					bisakah = body.slice(1)
					const bisa =['Bisa','Tidak Bisa','Coba Ulangi']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
					break 
				case 'kapankah':
					kapankah = body.slice(1)
					const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi','3 jam lagi','semenit lagi','1 abad lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
					break
				case 'truth':
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?truth&apikey=xptn`, {method: 'get'})
					ttrth = `${anu.Dare}`
					truteh = await getBuffer(`https://i.ibb.co/nDPNMVh/Ab4-Sl-Xcj-N0-OZ6-GNt0m-M13-P2ij-C2t-A76-FOcc2-Wh7m-Lu-Y.png`)
					client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
					break
				case 'dare':
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?dare&apikey=xptn`, {method: 'get'})
					der = `${anu.Dare}`
					tod = await getBuffer(`https://i.ibb.co/rv4kvrJ/images.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
			    break
			    case 'speed':
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    client.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, { quoted: mek})
                    break
                case 'tagme':
					var nom = mek.participant
					const tag = {
					text: `@${nom.split("@s.whatsapp.net")[0]} tagged!`,
					contextInfo: { mentionedJid: [nom] }
					}
					client.sendMessage(from, tag, text, {quoted: mek})
					break
                case 'donasi':
				case 'donate':
					client.sendMessage(from, 'Mau donasi ya beb?✨\n *trakteer* : https://trakteer.id/ling%20mo \n\n *saweria*  : https://saweria.co/LinM0', text, { quoted: mek })
					break
                case 'tes':
                   client.sendMessage(from, 'ok', text, {quoted: mek})
                break
                
                case 'lirik':
                    
					teks = body.slice(7)
					anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${teks}`, {method: 'get'})
					reply('Lirik dari lagu '+teks+' adalah :\n\n'+anu.result.lirik)
					break
				case 'anime':
					teks = body.slice(7)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/anime?query=${teks}`, {method: 'get'})
					reply('anime nya ni '+teks+' adalah :\n\n'+anu.title)
					break
                case 'report':
                     const pesan = body.slice(8)
                      if (pesan.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`

                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('6288742689173@s.whatsapp.net', options, text, {quoted: mek})
                    reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
                    break
                  case 'meme':
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'darkjoke':
                    data = await fetchJson(`https://api.zeks.xyz/api/darkjokes?apikey=vinzapi`)
                    dark = data.result
                    thumb = await getBuffer(dark)
                    client.sendMessage(from, thumb, image, {quoted: mek})
                    break
                 
                                         
				case 'ssweb':
					if (args.length < 1) return reply('Urlnya mana sayang')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
					buff = await getBuffer(anu.gambar)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'walpaperhd':
					if (args.length < 1) return reply('teks nya mana sayang')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/walpaper?query=${teks}&apikey=Jsieu8287362jshre82`)
					buff = await getBuffer(anu.result.LinkImg)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
			    case 'nekonime':
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nekonime?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Cintai nekonime'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				case 'hentai1':
				    try {
						res = await fetchJson(`https://api.itsmeikyxsec404.xyz/hentai?apikey=ItsApi`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! besok kiamat :v'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
			   case 'loli':
                    res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=${TobzApi}`, {method: 'get'})
                    buffer = await getBuffer(res.result)
                    client.sendMessage(from, buffer, image, { contextInfo: { participant: '447710173736@s.whatsapp.net', quotedMessage: { conversation: '*_calling FBI_*' } } }) 
                    const irimp3 = fs.readFileSync('./src/assets/fbi.mp3');
                    client.sendMessage(from, irimp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
		            
                    break
               case 'yuri':
                    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
                    buffer = await getBuffer(`https://tesgjgajkgd.herokuapp.com/api/yuri`, {method: 'get'})
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: 'di pc aja ajg klo di gc gw nanti dikick'})
                    break
                case 'shota':
				    try{
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/shota?apikey=${Lolapi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nich'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				 
			    case 'waifu':
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/waifu?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.image)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Cintai waifumu!'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'waifu2':
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/waifu?apikey=${TobzApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.image)
					waifu = `*${anu.desc}`
					client.sendMessage(from, buffer, image, {quoted: mek, caption: waifu})
					break
				 case 'chara-search':
				    if (args.length < 1) return reply('karakter anime apa yang mau dicari kak ?')
				    teks = body.slice(13)
					reply(mess.wait)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/character/${teks}?apikey=${Lolapi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.image.large)
					waifu = `*full name* : ${anu.result.name.full} \n *native* : ${anu.result.name.native} \n *deskripsi* : ${anu.result.description}`
					client.sendMessage(from, buffer, image, {quoted: mek, caption: waifu})
					break
			     case 'husbu':
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.image)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Cintai owner saya :v!'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				 case 'hentai1':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				        if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/erokemo`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'tobat kontol!'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				case 'ahegao':
			      if (!isGroup) return reply(mess.only.group)
				   if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
					reply(mess.wait)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/ahegao?apikey=${Lolapi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				 case 'ecchi':
				     if (!isGroup) return reply(mess.only.group)
				     if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
					reply(mess.wait)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/ahegao?apikey=${Lolapi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				 case 'elf':
					reply(mess.wait)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/random/elf?apikey=${Lolapi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				 case 'triggered':
				var imgbb = require('imgbb-uploader')
                                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                                         reply(mess.wait)
                                         owgi = await client.downloadAndSaveMediaMessage(ger)
                                         anu = await imgbb("55e7971b786836b9966eca4528210ba8", owgi)
                                        teks = `${anu.display_url}`
                                        ranpll = getRandom('.gif')
                                        ranoll = getRandom('.webp')
                                        anu1ll = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
                                         exec(`wget ${anu1ll} -O ${ranpll} && ffmpeg -i ${ranpll} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranoll}`, (err) => {
                                                fs.unlinkSync(ranpll)
                                                if (err) return reply(mess.error.stick)
                                                nobgll = fs.readFileSync(ranoll)
                                                client.sendMessage(from, nobgll, sticker, {quoted: mek})
                                                fs.unlinkSync(ranoll)
                                        })
                                    
                                             } else {
                                                 reply('Gunakan foto!')
                                          }
                                             break
                        case 'sfire':
             var imgbb = require('imgbb-uploader')
                                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                                         reply(mess.wait)
                                         owgi = await client.downloadAndSaveMediaMessage(ger)
                                         anu = await imgbb("55e7971b786836b9966eca4528210ba8", owgi)
                                        teks = `${anu.display_url}`
                                        ranpll = getRandom('.gif')
                                        ranoll = getRandom('.webp')
                                        anu1ll = await fetchJson(`https://api.zeks.xyz/api/sfire?img=${teks}&apikey=vinzapi`,{method:'get'})                   
                      exec(`wget ${anu1ll.result} -O ${ranpll} && ffmpeg -i ${ranpll} -vcodec libwebp -filter:v fps=fps=10 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranoll}`, (err) => {                     
                                                                fs.unlinkSync(ranpll)
                                                if (err) return reply(mess.error.stick)
                                                buffer = fs.readFileSync(ranoll)
                                                client.sendMessage(from, buffer, sticker, { contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_STICKER FIRE_*' } } }) 
                                                fs.unlinkSync(ranoll)
                                        })                                   
                                             } else {
                                                reply('Gunakan foto!')
                                          }           
                                          break                                   
                       case 'wasted':

				          var imgbb = require('imgbb-uploader')

                                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

                                         reply(mess.wait)

                                         owgi = await client.downloadAndSaveMediaMessage(ger)

                                         anu = await imgbb("55e7971b786836b9966eca4528210ba8", owgi)

                                        teks = `${anu.display_url}`

                                        ranpll = getRandom('.png')

                                        ranoll = getRandom('.webp')

                                        anu1ll = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`

                                         exec(`wget ${anu1ll} -O ${ranpll} && ffmpeg -i ${ranpll} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranoll}`, (err) => {

                                                fs.unlinkSync(ranpll)

                                                if (err) return reply(mess.error.stick)

                                                nobgll = fs.readFileSync(ranoll)

                                                client.sendMessage(from, nobgll, sticker, { contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_Wasted_*' } } }) 

                                                fs.unlinkSync(ranoll)

                                        })

                                    

                                             } else {

                                                 reply('Gunakan foto!')

                                          }           

                                          break
                         case 'gay':

				          var imgbb = require('imgbb-uploader')

                                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

                                         reply(mess.wait)

                                         owgi = await client.downloadAndSaveMediaMessage(ger)

                                         anu = await imgbb("55e7971b786836b9966eca4528210ba8", owgi)

                                        teks = `${anu.display_url}`

                                        ranpll = getRandom('.png')

                                        ranoll = getRandom('.webp')

                                        anu1ll = `https://some-random-api.ml/canvas/gay?avatar=${teks}`

                                         exec(`wget ${anu1ll} -O ${ranpll} && ffmpeg -i ${ranpll} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranoll}`, (err) => {

                                                fs.unlinkSync(ranpll)

                                                if (err) return reply(mess.error.stick)

                                                nobgll = fs.readFileSync(ranoll)

                                                client.sendMessage(from, nobgll, sticker, { contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_MARK GAY_*' } } }) 

                                                fs.unlinkSync(ranoll)

                                        })

                                    

                                             } else {

                                                 reply('Gunakan foto!')

                                          }           

                                          break
                                          case 'ytcom':

             reply(mess.wait)

            gh = body.slice(7)

                                         usnm = gh.split("|")[0];

                                         cmn = gh.split("|")[1];

                                         var imgbb = require('imgbb-uploader')

                                         ghost = mek.participant

                                         try {

                                         pp = await client.getProfilePicture(ghost)

                                         } catch {

                                         pp = 'https://i.ibb.co/64dN6bQ/IMG-20201220-WA0024.jpg'

                                         }

                                         media = await getBuffer(pp)

                                         datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))

                                           fs.writeFileSync('getpp.jpeg', datae, 'base64')

                                         res = await imgbb("55e7971b786836b9966eca4528210ba8", 'getpp.jpeg')

                                         buffer = await getBuffer(`https://some-random-api.ml/canvas/youtube-comment?avatar=${res.display_url}&comment=${cmn}&username=${usnm}`)

                                         client.sendMessage(from, buffer, image, { caption: 'NIH',                    contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_YOUTUBE COMMENT_*' } } })

                                         break
                       case 'phkomen':

             reply(mess.wait)

            gh = body.slice(8)

                                         usnm = gh.split("|")[0];

                                         cmn = gh.split("|")[1];

                                         var imgbb = require('imgbb-uploader')

                                         ghost = mek.participant

                                         try {

                                         pp = await client.getProfilePicture(ghost)

                                         } catch {

                                         pp = 'https://i.ibb.co/64dN6bQ/IMG-20201220-WA0024.jpg'

                                         }

                                         media = await getBuffer(pp)

                                         datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))

                                           fs.writeFileSync('getpp.jpeg', datae, 'base64')

                                         res = await imgbb("55e7971b786836b9966eca4528210ba8", 'getpp.jpeg')

                                         buffer = await getBuffer(`https://api.zeks.xyz/api/phub?apikey=vinzapi&img=${res.display_url}&username=${usnm}&msg=${cmn}`)

                                         client.sendMessage(from, buffer, image, { caption: 'NIH',                    contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_mark  COMMENT_*' } } })

                                         break
                                         case 'randomanime':
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=${TobzApi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni randomanime!'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
			    case 'randomhentai':
			         if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
                    data = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=${TobzApi}`)
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek})
                    break
                case 'kpop':
                    data = await fetchJson(`https://tobz-api.herokuapp.com/api/randomkpop?apikey=${TobzApi}`)
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek})
                    break
                case 'pussy':
                    reply(mess.wait)
                    data = await fetchJson(`https://api.itsmeikyxsec404.xyz/pussy?apikey=${ItsApi}`)
                    hasil = await getBuffer(data.url)
                    client.sendMessage(from, hasil, video, {mimetype: 'video/mp4', quoted: mek})
                    break
                 case 'boobs':
                     reply(mess.wait)
                    data = await fetchJson(`https://api.itsmeikyxsec404.xyz/boobs?apikey=${ItsApi}`)
                    hasil = await getBuffer(data.url)
                    client.sendMessage(from, hasil, video, {mimetype: 'video/mp4', quoted: mek})
                    break
                case 'hentong':
                    reply(mess.wait)
                    data = await fetchJson(`https://api.itsmeikyxsec404.xyz/randomnhentai?apikey=${ItsApi}`)
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek})
                    break
                 case 'tomp3':
                	client.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('_*Reply Video nya Gan!*_')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal, pada saat mengkonversi video ke mp3')
						bufferlkj = fs.readFileSync(ran)
						client.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break 
					case 'nsfw-waifu':
				    try {
						if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/waifu?apikey=${Lolapi}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, { contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_SANGE..._*' } } }) 
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'hololewd':
				    try {     
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/hololewd`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'wphentai':
				    try {
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/tits`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'femdom':
				    try {
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/femdom`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'holo':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/holo`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'donasi nomor lah cuk atau gmail gk ke pake'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'eroyuri':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/eroyuri`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'pc aja lah ajg'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'kuni':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/kuni`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'erofeet':
				    try {
					  if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/erofeet`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'erofeet':
				    try {
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/erofeet`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'ero':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/ero`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'pc aja lah ajg'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'smallboobs':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/smallboobs`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'bingung mo ngetik apa :)'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'cuddle':
				    try {
					    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/cuddle`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'bingung mo ngetik apa :)'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'futanari':
				    try {
					     if (!isGroup) return reply(mess.only.group)
				         if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://nekos.life/api/v2/img/futanari`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'bingung mo ngetik apa :)'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				  case 'foxgirl':
				    try {
						res = await fetchJson(`https://nekos.life/api/v2/img/fox_girl`, {method: 'get'})
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'bingung mo ngetik apa :)'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
			    case 'nsfwblowjob':
				    try {
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR sayang* ❌')
					}
					break
			    case 'nsfwneko':
				    try {
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni sayang'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR sayang* ❌')
					}
					break
				case 'nsfwtrap':
				    try {
						if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim fix lu gay asw'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
					case 'ytmp3':
					if (args.length < 1) return reply('Urlnya mana sayang?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`http://api.hurtzcrafter.xyz/ytdlurl?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*duration* : ${anu.duration}`
					gambar = await getBuffer(anu.thumb.url)
					client.sendMessage(from, gambar, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.audio[0].url)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
					break
				    case 'joox':
			        tels = body.slice(6)
	                data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${tels}&apikey=BotWeA`, {method: 'get'})
	               if (data.error) return reply(data.error)
	                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}`
	                buffer = await getBuffer(data.result.thumb)
	                lagu = await getBuffer(data.result.mp3)
	                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
	                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
	                break
				case 'wiki':    
                    if (args.length < 1) return reply('teks nya mana sayang?')
                    teks = body.slice(5)
                    reply(mess.wait)
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${teks}&apikey=BotWeA`, {method: 'get'})
                    if (anu.error) return reply(anu.error)
                    buff = await getBuffer(anu.result)
                    hasil = `${anu.result}`
                    client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
                   break
               case 'infogempa':
                   anu = await fetchJson(`https://tobz-api.herokuapp.com/api/infogempa?apikey=BotWeA`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   buff = await getBuffer(anu.map)
                   hasil = ` *potensi* \n ${anu.potensi} *lokasi* \n${anu.lokasi} *magnitude* \n${anu.magnitude} *koordinat* \n${anu.koordinat} *kedalaman* \n${anu.kedalaman}`
                   client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
                   break
               case 'happymod':
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=BotWeA`)
			hupo = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*version*: ${hupo.version}\n*size:* ${hupo.size}\n*root*: ${hupo.root}\n*purchase*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			break
			      case 'tebakgambar':
					anu = await fetchJson(`https://videfikri.com/api/tebakgambar/`, {method: 'get'})
					bufferkkk = await getBuffer(anu.result.soal_gbr)
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, bufferkkk, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
                case 'caklontong':
					anu = await fetchJson(`http://zekais-api.herokuapp.com/caklontong`, {method: 'get'})
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.jawaban+'\n'+anu.detail, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, anu.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
					case 'pinterest':
                   if (args.length < 1) return reply('Yang mau di cari apaan?')
                    teks = body.slice(9)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/pinterest?apikey=${Lolapi}&query=${teks}`, {method: 'get'})
					nye = await getBuffer(anu.result)
					client.sendMessage(from, nye, image, { caption: 'hasil', quoted: mek })
					break
					case 'googleimg':
                   if (args.length < 1) return reply('Yang mau di cari apaan?')
                    teks = body.slice(10)
                    reply(mess.wait)
					anu = await fetchJson(`http://api.hurtzcrafter.xyz/googleimage?q=${teks}`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					client.sendMessage(from, nye, image, { quoted: mek, caption: `*google*\n*Hasil Pencarian* : *${teks}*`})
					var gg = JSON.parse(JSON.stringify(anu.result));
					var ge =  gg[Math.floor(Math.random() * gg.length)];
					nye = await getBuffer(ge)
					client.sendMessage(from, nye, image, { quoted: mek, caption: `*google*\n*Hasil Pencarian* : *${teks}*`})
					var hh = JSON.parse(JSON.stringify(anu.result));
					var gt =  hh[Math.floor(Math.random() * hh.length)];
					nye = await getBuffer(gt)
					client.sendMessage(from, nye, image, { quoted: mek, caption: `*google*\n*Hasil Pencarian* : *${teks}*`})
					break
					case 'r-alquran':    
                    reply(mess.wait)
                    anu = await fetchJson(`https://api.zeks.xyz/api/randomquran`, {method: 'get'})
                    if (anu.error) return reply(anu.error)
                    buff = await getBuffer(`https://blog.anteraja.id/wp-content/uploads/2019/10/Gambar-Al-Quran-8-1-768x493.jpg`, {method: 'get'})
                    hasil = `❒ *nama* : ${anu.result.nama} \n │ \n ┝⋗ *arti* : ${anu.result.arti} \n ┝⋗ *ayat* : ${anu.result.ayat} \n ┝⋗ *keterangan* : ${anu.result.keterangan} \n └⋗ *Audio* : ${anu.result.audio}`
                    client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
                   break
                   case 'resepmasakan':
                   anu = await fetchJson(`https://mnazria.herokuapp.com/api/resep?key=${body.slice(6)}`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   buff = await getBuffer(anu.thumb_item)
                   hasil = `*title* \n ${anu.title} *item_name* \n ${anu.item_name} *ingredient* \n${anu.ingredient} *step* \n${anu.step}`
                   client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
                   break
                   case 'ytsearch':
					if (args.length < 1) return reply('Yang mau di cari apaan? nekopoi?')
					yy = body.slice(8)
					anu = await fetchJson(`http://api.hurtzcrafter.xyz/ytsearch?q=${yy}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result[0].thumb)
					teks = '═════════ ❃ ═════════'
					for (let i of anu.result) {
						teks += `\n *Title* : *${i.title}*\n \n*pembuat* : *${i.author}* \n *durasi* : ${i.timestamp}\n*desc* : ${i.desc}\n*url* : ${i.url}\n\n═════════ ❃ ═════════`
					}
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks.trim()})
					break
				 
				  case 'playstore':
					if (args.length < 1) return reply('Yang mau di cari apaan? minecraft?')
					tp = body.slice(10)
					anu = await fetchJson(`https://naufalhoster.xyz/tools/googleplay?apikey=${Naufal}&query=${tp}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result[0].icon)
					teks = '═════════ ❃ ═════════'
					for (let i of anu.result) {
						teks += `\n *Title* : *${i.title}*\n \n*developer* : *${i.developer}*\n \n*priceText* : ${i.priceText}\n*summary* : ${i.summary}\n\n*url* : ${i.url}\n═════════ ❃ ═════════`
					}
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks.trim()})
					break
				  case 'shopee':
					if (args.length < 1) return reply('Yang mau di cari apaan? ?')
					tp = body.slice(7)
					anu = await fetchJson(`https://pencarikode.xyz/api/shopee?search=${tp}&apikey=pais`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result[0].img_cover)
					teks = '═════════ ❃ ═════════'
					for (let i of anu.result) {
						teks += `\n *judul* : *${i.nama}*\n *status* : ${i.status} \n\n*terjual* : *${i.terjual}*\n \n*harga* : ${i.harga}\n*lokasi* : ${i.lokasi}\n\n*url* : ${i.link_produk}\n *deskripsi* : ${i.deskripsi}\n═════════ ❃ ═════════`
					}
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks.trim()})
					break
					case 'apksearch':
					if (args.length < 1) return reply('Yang mau di cari apaan? minecraft?')
					tp = body.slice(10)
					anu = await fetchJson(`http://api.hurtzcrafter.xyz/apk-search?q=${tp}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result[0].thumb)
					teks = '═════════ ❃ ═════════'
					for (let i of anu.result) {
						teks += `\n *nama* : *${i.name}*\n *desc* : ${i.desc} \n*url* : ${i.url} *download* : ${i.dl_url} \n═════════ ❃ ═════════`
					}
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks.trim()})
					break
				  case 'xvideo':
				    if (!isGroup) return reply(mess.only.group)
				    if (!isNsfw) return reply('❌ *NSFW PADA GRUP INI BELUM AKTIF* ❌')
					if (args.length < 1) return reply('Yang mau di cari apaan? gay?')
					tp = body.slice(7)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/porn?search=${tp}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result[0].image)
					teks = '═════════ ❃ ═════════\n'
					for (let i of anu.result) {
						teks += `\n *Title* : *${i.title}*\n \n*aktor/pemain* : *${i.actors}* \n*durasi* : ${i.duration}\n*link* : ${i.url}\n\n\n═════════ ❃ ═════════n`
					}
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks.trim()})
					break
				  
				 
				 
				 case 'happymod2':
				    if (!isGroup) return reply(mess.only.group)
					if (args.length < 1) return reply('Yang mau di cari apaan? pubg?')
					hm = body.slice(10)
					anu = await fetchJson(`https://api.zeks.xyz/api/happymod?apikey=vinzapi&q=${hm}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result[0].thumb)
					teks = '═════════ ❃ ═════════\n'
					for (let i of anu.result) {
						teks += `\n *Title* : *${i.title}*\n \n*rating* : *${i.rating}*\n *link* : *${i.url} \n\n═════════ ❃ ═════════n`
					}
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks.trim()})
					break
					case 'tiktok':
					if (args.length < 1) return reply('Urlnya mana sayang?')
					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/tiktok?url=${args[0]}&apiKey=${BarBarApi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {quoted: mek})
					break
				case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, 'Usernamenya mana sayang?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Kemungkinan username tidak valid')
					}
					break
					case 'playmusic':  
				     if (!isGroup) return reply(mess.only.group)
                     reply(mess.wait)
                     ling = body.slice(11)
                     anu = await fetchJson(`https://videfikri.com/api/ytplay/?query=${ling}`)
                     if (anu.error) return reply(anu.error)
                     infomp3 = `*〖YT PLAY〗*\n • *Judul* : ${anu.result.title} \n *channel* : ${anu.result.channel} \n • *durasi* : ${anu.result.duration} \n • *ukuran* : ${anu.result.size} \n *deskripsi* : ${anu.result.description}*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
                     buffer = await getBuffer(anu.result.thumbnail)
                     lagu = await getBuffer(anu.result.url)
                     client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                     client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                     break 
                     case 'cekjodoh':          
                    if (args.length < 1) return reply('nama lu mna cok')
                    if (args.length < 2) return reply('nama cewe lu \n biar gw santet :v')
                    ling = body.slice(9)
                    var elu = ling.split("|")[0];
                     var cewelu = ling.split("|")[1];
                    anu = await fetchJson(`http://api.hurtzcrafter.xyz/ramalan-jodoh?nama1=${elu}&nama2=${cewelu}`)
                    reply(mess.wait)
                    buff = await getBuffer(anu.result.thumb)
			        hasil = `Nama : ${anu.result.nama1}\nPasangan : ${anu.result.nama2}\n\nPositif : ${anu.result.positif}\nNegatif : ${anu.result.negatif}`
			        client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
			        break
			       case 'attp':

					if (args.length < 1) return reply('teks nya mana om')

		            var imgbb = require('imgbb-uploader')

                     teks = body.slice(6)

                     

                     try {

                     pp = `https://api.xteam.xyz/attp?file&text=${teks}`

                     media = await getBuffer(pp)

                     datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))

                     fs.writeFileSync('stahta.gif', datae, 'base64')

                     res = await imgbb('6c4075f841151df1c48974f013aa239a', 'stahta.gif')

                     ranp = getRandom('.gif')

                     rano = getRandom('.webp')

                     exec(`wget ${res.display_url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=10 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}}`, (err) => {

                             //fs.unlinkSync(ranp)

                             

                             pps = fs.readFileSync('./stahta.gif')

                             client.sendMessage(from, pps, sticker, { contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_ATTP_*' } } })

                             //fs.unlinkSync(rano)

                            })

                    } catch(e) {

                       reply(`Error!`)

                       }

                   break
                   case 'kbbi':
					if (args.length < 1) return reply('Apa yang mau dicari sayang?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					break
					case 'grup':
					case 'gc':
					case 'group':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`𝐏𝐞𝐫𝐢𝐧??𝐚𝐡 𝐝𝐢𝐭??𝐫𝐢𝐦𝐚, 𝐛𝐞𝐫𝐡𝐚𝐬𝐢𝐥 𝐦𝐞𝐧𝐠𝐮𝐛𝐚𝐡 𝐠𝐫𝐨𝐮𝐩 𝐬𝐞𝐦𝐮𝐚 𝐨𝐫??𝐧𝐠 𝐛??𝐬𝐚 𝐦𝐞𝐧𝐠𝐢𝐫𝐢𝐦 𝐩𝐞𝐬𝐚𝐧`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`𝐏𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐝𝐢𝐭𝐞𝐫𝐢𝐦𝐚, 𝐛𝐞𝐫𝐡𝐚𝐬𝐢𝐥 𝐦𝐞𝐧𝐠𝐮𝐛𝐚𝐡 𝐠𝐫𝐨𝐮𝐩 𝐡𝐚𝐧𝐲𝐚 𝐚𝐝𝐦𝐢𝐧 𝐲𝐚𝐧𝐠 𝐛𝐢𝐬𝐚 𝐦𝐞𝐧𝐠𝐢𝐫𝐢𝐦 𝐩𝐞𝐬𝐚𝐧`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
					case 'tagall':
			        
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*♯* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
			    case 'otagall':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions('╔══✪〘 Mention All 〙✪══'+teks+'╚═〘  *TMP BOT* 〙', members_id, true)
					break
				case 'clearall':
					if (!isOwner) return reply('Kamu siapa? kamu bukan, pacarku hanya pacarku yg boleh')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Sukses delete all chat :) sayang')
					break
				case 'bc':
					if (!isOwner) return reply('Kamu siapa? kamu bukan pacar, pacarku kemana?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ *🄽🄴🄶🄴🅅
  BROADCAST!* ]\n\n${body.slice(4)}`})
						}
						reply('berhasil sayang')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ *🄽🄴🄶🄴🅅
 BROADCAST!* ]\n\n${body.slice(4)}`)
						}
						reply('Berhasil sayang')
					}
					break
				case 'add':
				if (!isGroup) return reply(mess.only.group)
				if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				if (args.length < 1) return reply('Yang mau di add jin ya?')
				if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
				try {
					num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
					client.groupAdd(from, [num])
				} catch (e) {
					console.log('Error :', e)
					return client.sendMessage(from, 'Diprivate asu:v', MessageType.text)
				}
				break
			    case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan beban grup:\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
					case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, anda telah menjdi admin :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, anda menjadi admin : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'delete':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, hapus pesan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					} else {
						mentions(`Perintah di terima, hapus pesan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.deleteMessage(from, mentioned)
					}
					break
			    case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, anda tidak menjadi admin lagi :(:\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, anda tidak menjadi admin : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'listadmins':
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
					if (!isQuotedSticker) return reply('❌ ba-baaka, reply stickernya  ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi sticker ke gambar ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//< nih ga -gaambarnya'})
						fs.unlinkSync(ran)
					})
					break
					
				case 'simi':
					if (args.length < 1) return reply('Textnya mana sayang?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://simsumi.herokuapp.com/api?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau ajg')
					await client.reply(from, anu.jawaban, id)
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('Mode simi sudah aktif')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Sukses mengaktifkan mode simi di group ini')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Sukes menonaktifkan mode simi di group ini')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
			    case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Mode nsfw sudah aktif')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('Sukses mengaktifkan mode nsfw di group ini')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('Sukes menonaktifkan mode nsfw di group ini')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
				case 'openanime':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAnime) return reply('Mode anime sudah aktif')
						anime.push(from)
						fs.writeFileSync('./src/anime.json', JSON.stringify(anime))
						reply('Sukses mengaktifkan mode anime di group ini')
					} else if (Number(args[0]) === 0) {
						anime.splice(from, 1)
						fs.writeFileSync('./src/anime.json', JSON.stringify(anime))
						reply('Sukes menonaktifkan mode anime di group ini')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Udah aktif sayang')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses mengaktifkan fitur welcome di group ini')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses menonaktifkan fitur welcome di group ini')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal sayang, maaf ya')
					}
					break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break
		        //fitur adminbot
		        case 'setpp2':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isadminbot) return reply('Kamu siapa? kamu bukan pacar ku')
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply('Sukses mengganti icon Grup')
                    break
                case 'bc2':
					if (!isadminbot) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ *ADMIN BROADCAST!* ]\n\n${body.slice(4)}`})
						}
						reply('Berhasil Om')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ *ADMIN BROADCAST* ]\n\n${body.slice(4)}`)
						}
						reply('Berhasil Om')
					}
					break
				case 'hidetag2':
					if (!isGroup) return reply(mess.only.group)
					if (!isadminbot) return reply('Kamu siapa? kamu bukan pacarku, hanya pacarku yg boleh ')
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
					//
				case 'setpp3':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isfrendsowner) return reply('Kamu siapa?')
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply('Sukses mengganti icon Grup')
                    break
                case 'bc3':
					if (!isfrendsowner) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ *DOI BROADCAST!*]\n\n${body.slice(4)}`})
						}
						reply('Berhasil Om')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ *🄽🄴🄶🄴🅅 BROADCAST!* ]\n\n${body.slice(4)}`)
						}
						reply('Berhasil Om')
					}
					break
				case 'hidetag3':
					if (!isGroup) return reply(mess.only.group)
					if (!isfrendsowner) return reply('Kamu siapa?')
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
				//frendowner
				case `addadmin`:
                   if (!isOwner) return reply('Perintah ini hanya bisa di gunakan oleh Owner !', id)
                   for (let i = 0; i < mentionedJidList.length; i++) {
                   adminNumber.push(mentionedJidList[i])
                   fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                   reply('Success Menambahkan Admin !')
				   }
                   break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja sayang')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
