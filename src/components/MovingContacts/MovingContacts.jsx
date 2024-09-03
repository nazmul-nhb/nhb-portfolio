import { useState } from "react";
import { icons } from "../../data/data";

const MovingContacts = () => {
	const [isPaused, setIsPaused] = useState(false);

	return (
		<div className="w-full h-auto my-8 text-center">
			<div className="carousel-container w-full h-auto">
				<div
					className={`carousel ${isPaused ? "paused" : ""}`}
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
					onClick={() => setIsPaused(!isPaused)}
				>
					{icons.map((icon, index) => {
						const IconComponent = icon.component;
						return (
							<a
								key={index}
								href={icon.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`carousel-item ${icon.color}`}
								style={{
									transform: `rotateY(${
										index * 51
									}deg) translateZ(10rem)`,
								}}
								title={icon.title}
							>
								<IconComponent className="hover:scale-150 hover:text-white transition-all duration-500 text-4xl" />
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default MovingContacts;
