import React from 'react';
import { Tooltip } from 'primereact/tooltip';

const ToolTips = () => {
	return (
		// <div class="relative flex flex-col items-center group">
		// 	<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
		// 		<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
		// 	</svg>
		// 	<div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex drop-shadow-md z-[9999]">
		// 		<span class="relative min-w-[280px] z-10 p-2 text-[14px] leading-none text-white whitespace-no-wrap bg-[#5ccce8] rounded-md ">{title}</span>
		// 		<div class="w-3 h-3 -mt-2 rotate-45 bg-[#5ccce8]"></div>
		// 	</div>
		// </div>

		<Tooltip target=".tooltip"></Tooltip>


	)
}

export default ToolTips
