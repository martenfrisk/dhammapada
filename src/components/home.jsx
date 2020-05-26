import React from 'react'
import buddha from '../img/buddha-blue.svg'
import { Link } from 'react-router-dom'

export default function Home() {
	var hasTouchScreen = false;
if ("maxTouchPoints" in navigator) { 
    hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0; 
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}


	return (
		<div className="flex flex-col items-center self-center mx-auto mt-20 text-2xl">
			<div className="font-serif text-3xl font-thin font-normal text-red-900">Dhammapada Reader</div>
			<img src={buddha} className="w-24 h-24 mt-16 mb-16 " alt="Lotus flower" />
			<div className="w-2/3 mb-8 font-serif text-base text-center">
<p className="mb-2">The Dhammapada is a collection of sayings of the Buddha and one of the most widely read Buddhist scriptures.</p>
<p className="mb-2">Use this website to read it without distractions.</p>
<p className="mb-4">Planned features include alternative translations and commentaries.</p>
			
			{hasTouchScreen ? <p className="text-gray-800">Swipe sideways or use the side markers to go to next verse.</p> : <p className="text-gray-800">Navigate using your left/right arrow keys, scroll or by clicking the markers on the side of the text.</p>}
			</div>
			<Link to="/dhammapada/1" className="font-serif text-sm text-red-900 lowercase border-b border-red-900 border-dashed">
				start chapter one
			</Link>
			<div className="mt-48 text-xs font-light text-red-900 lowercase">sources and copyright information</div>
		</div>
	)
}
