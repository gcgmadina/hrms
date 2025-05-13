<template>
  <aside class="sidebar">
    <h2 class="logo">HR App</h2>
    <nav class="menu">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/employees">Employee</a></li>
        <li><a href="/attendance">Attendance</a></li>
        <li><a href="/leave_request">Leave Request</a></li>
        <li><a href="/payroll">Payroll</a></li>
        <li><a href="/user">User</a></li>
        <li class="spacer"></li>
        <li><a href="#">Profile</a></li>
        <li><button class="logout">Logout</button></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
.logo {
  margin-bottom: 20px;
  font-size: 20px;
}
.menu ul {
  list-style: none;
  padding: 0;
}
.menu li {
  margin: 10px 0;
}
.menu a {
  color: white;
  text-decoration: none;
}
.spacer {
  margin-top: 100px;
}
.logout {
  background-color: #e74c3c;
  color: white;
  padding: 8px;
  border: none;
  width: 100%;
  cursor: pointer;
}
</style>
