export default function LoginForm() {
    return (
        <form>
        <label htmlFor="username">아이디</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="password" />
        
        <button type="submit">로그인</button>
        </form>
    );
}