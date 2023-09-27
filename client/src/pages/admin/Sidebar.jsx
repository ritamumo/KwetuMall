const Sidebar = () => {
  return (
    <div className="body">
      <div className="sidebar">
        <p>KwetuMall</p>
        <p>Admin panel</p>
        <p><button className="createBtn">Products</button></p>
        <p><button className="createBtn">Categories</button></p>
        <p><button className="createBtn">Pickup points</button></p>
        <p><button className="createBtn">Users</button></p>
        <p><button className="createBtn">Admins</button></p>
        <p><button className="createBtn">My account</button></p>
        <p><button className="createBtn">Logout</button></p>
      </div>
    </div>
  );
};

export default Sidebar;
