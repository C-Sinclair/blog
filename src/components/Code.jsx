import Highlight, { defaultProps } from 'prism-react-renderer';

export default ({ children, language = 'javascript' }) => {
	return (
		<Highlight {...defaultProps} code={children} language={language}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={className} style={{ ...style }}>
					{tokens.map((line, i) => (
						<div key={i} {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span key={key} {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
};
