const LoginForm = ({ onSubmit, username, setUsername, setPassword, password }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>username <input type="text" onChange={({ target }) => setUsername(target.value)} value={username} /></label>
        </div>
        <div>
          <label>password <input type="password" onChange={({ target }) => setPassword(target.value)} value={password}/></label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm