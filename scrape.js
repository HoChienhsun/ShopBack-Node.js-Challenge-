const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const write_s = fs.createWriteStream('NodeJs_output.txt');

write_s.write('The log file begins from here\n');

request(process.argv[2],(error,response,html) => {
	if(!error && response.statusCode == 200){
		const $ = cheerio.load(html);
		rel_list = [];
		alt_list = [];

		var img_counter=0;
		$('img').each(function(i,element){
			img_counter ++;
			const atr = $(element).attr('alt');
			alt_list.push(atr);
		});
		if((img_counter-alt_list.length) > 0){
		console.log('There are ' + (img_counter - alt_list.length) + ' <img/> tags without alt attribute');
		write_s.write('There are ' + (img_counter - alt_list.length) + ' <img/> tags without alt attribute\n');
		} 
		var a_counter=0;
		$('a').each(function(i,element){
			a_counter ++;
			const atr = $(element).attr('rel');
			a_list.push(atr);
		});
		if((a_counter-rel_list.length) > 0){
		console.log('There are ' + (a_counter - rel_list.length) + ' <a/> tag without rel attribute');
		write_s.write('There are ' + (a_counter - rel_list.length) + ' <a/> tag without rel attribute\n');
		}

		var title_counter=0;
		$('head').children('title').each(function(i,element){
			title_counter++;
		});
		if(title_counter==0){
			console.log('This HTML does not have </title> tag');
			write_s.write('This HTML does not have </title> tag\n');
		}
		
		$('head').children('meta').each(function(i,element){
			const atr = $(element).attr('name');

			if(atr == 'keywords') {
				console.log('This HTML has <meta name:'+ atr +' .../> tag');
				write_s.write('This HTML has <meta name:'+ atr +' .../> tag\n');
			}
			if(atr == 'descriptions'){ 
				console.log('This HTML has <meta name:'+ atr +' .../> tag');
				write_s.write('This HTML has <meta name:'+ atr +' .../> tag\n');
			}
		});
		

		var strong_counter = 0;
		$('strong').each(function(i,element){
			strong_counter ++;
		});
		//console.log(strong_counter);
		if(strong_counter > 15){
			console.log('The number of <strong> tags is more than 15');
			write_s.write('The number of <strong> tags is more than 15\n');

		}

		var h1_counter=0;
		$('h1').each(function(i,element){
			h1_counter ++;
		});
		console.log('The number of <h1> tags is :' + h1_counter);
		write_s.write('The number of <h1> tags is :' + h1_counter);
	}

})