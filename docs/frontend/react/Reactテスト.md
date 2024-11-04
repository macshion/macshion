# Reactテスト

テストライブラリー

https://github.com/Shin-sibainu/react-testing-library-tutorial

**testing-library**

jest-dom

user-event

`setUpTest.js`でインポートする。

```javascript
// npm scripts
"test": "react-scripts test --verbose"
```



テストの例：

![image-20241030072534885](./assets/React%E3%83%86%E3%82%B9%E3%83%88/image-20241030072534885.png)

```javascript
screen.getByText();
```

```javascript
expect(linkElement).toBeIntheDocument();
```



**UI library**

React-Bootstrap



#　Loginテスト

````javascript
describe("", ()=>{
  test("", async()=>{
    render(<Login/>);
    const button = awaite screen.findAllByRole("button");
    expect(buttonList).toHaveLength()
  });
  
  test("should be failed", ()=>{
    const testEmail = "shincide.com";
    expect(validateEmail(testmaul)).not.toBe(true);
  });
  
  test("should be succesed", ()=>{
    const testEmail = "shincide@gmail.com";
    expect(validateEmail(testmaul)).not.toBe(true);
  });
  
  test("", ()=>{
    render(<Login/>);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type","password");
  });
  
  test("",()=>{
    render(<Login/>);
    const submitButton = screen.getById("submit");
    const email = screen.getByPlaceHolder("メールアドレス入力");
    const password = screen.getByPlaceHolderText("パスワード入力");
    
    userEvent.type(email, "shincode@gmail.com");
    userEvent.type(password,"fdferer");
    
    userEvent.click(submitButton);
    const userInfo = screen.getByTest("");
    expect(userInfo).toBeInTheDocument();
  })
})
````

