(() => ({
  name: 'MarkdownText',
  type: 'CONTENT_COMPONENT',
  icon: 'TitleIcon',
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'Markdown',
      package: 'npm:react-markdown@8.0.7',
      imports: [],
    },
    {
      label: 'remarkGfm',
      package: 'npm:remark-gfm@4.0.0',
      imports: [],
    },
    {
      label: 'SyntaxHighlighter',
      package: 'npm:react-syntax-highlighter@15.5.0',
      imports: ['Prism'],
    },
  ],
  allowedTypes: [],
  jsx: (() => {
    const {
      Markdown: { default: Markdown },
      remarkGfm: { default: remarkGfm },
      SyntaxHighlighter: { Prism },
    } = dependencies;

    return (
      <Markdown
        children={options.content.toString()}
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');

            return match ? (
            <Prism
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
            />
            ) : (
            <code {...rest} className={className}>
              {children}
            </code>
            );
          },
        }}
      />
    );
  })(),
  styles: (B) => (t) => {
    const style = new B.Styling(t);
    return {
      root: {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        margin: 0,
        paddingTop: ({ options: { padding } }) =>
          style.getSpacing(padding[0], 'Desktop'),
        paddingRight: ({ options: { padding } }) =>
          style.getSpacing(padding[1], 'Desktop'),
        paddingBottom: ({ options: { padding } }) =>
          style.getSpacing(padding[2], 'Desktop'),
        paddingLeft: ({ options: { padding } }) =>
          style.getSpacing(padding[3], 'Desktop'),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        fontWeight: ({ options: { type } }) => style.getFontWeight(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        textAlign: ({ options: { align } }) => align,
        color: ({ options: { color } }) => style.getColor(color),
      },
    };
  },
}))();
