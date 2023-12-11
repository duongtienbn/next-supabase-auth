function Notification() {
  return <div onClick={e => e.stopPropagation()} className="noti-content">
    <div className="noti-main" style={{ height: "70px"}}>
        <strong>お知らせ</strong>
        <div className="noti-body">

        </div>
    </div>
  </div>;
}

export default Notification;
