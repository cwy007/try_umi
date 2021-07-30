import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';

const App = () => {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type: string, val: any) {
    // console.log('type, val->', type, val);

    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Bala bala' },
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  const toolbar = [
    {
      type: 'image',
      title: '相册',
      icon: 'image',
    },
  ];

  const onToolbarClick = (item: any, event: any) => {
    console.log('item->', item);

    console.log('window.ChatSDK->', window.ChatSDK);

    console.log('window.ChatSDK.version->', window.ChatSDK.version);
  };

  return (
    <Chat
      navbar={{ title: '智能助理' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      toolbar={toolbar}
      onToolbarClick={onToolbarClick}
    />
  );
};

export default App;
