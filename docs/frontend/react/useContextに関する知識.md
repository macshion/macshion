# useContextに関する知識

useContextは、ReactのContext APIと一緒に使って、いろんなコンポーネントでデータや状態を共有できる便利なフックです。Context APIには主にこんなものがあります：

- React.createContext: コンテキストを作る。
- Provider: 作ったコンテキストの値をコンポーネントツリーに渡す。
- useContext: コンポーネントの中でそのコンテキストの値を受け取る。