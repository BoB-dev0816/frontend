import React from "react";

/**
 * 다용도 Button 컴포넌트
 * @param {object} props
 * @param {React.ReactNode} props.children - 버튼 내부 내용
 * @param {function} [props.onClick] - 클릭 이벤트 핸들러
 * @param {string} [props.type] - 버튼 타입 (button, submit 등)
 * @param {boolean} [props.disabled] - 비활성화 여부
 * @param {string} [props.className] - 추가 클래스명
 * @param {object} [props.style] - 인라인 스타일
 */
const Button = ({
	children,
	onClick,
	type = "button",
	disabled = false,
	className = "",
	style = {},
	...rest
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition ${className}`}
			style={style}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
