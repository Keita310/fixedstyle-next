const PrevNext = () => {
  return (
    <nav className="prev-next">
      <ul>
        <li className="prev">
          <a href="https://fixedstyle.net/customize/doubler/">
            <img src="https://fixedstyle.net/wp-content/static-img/customize/doubler/top.jpg" className="old-thumbnail" />
            <p>ブレーキワイヤー2本引き加工</p>
          </a>
        </li>
        <li className="next">
          <a href="https://fixedstyle.net/customize/change_seat/">
            <img src="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-100x100.jpg" className="attachment-st_thumb100 size-st_thumb100 wp-post-image" alt="ピストシート交換" srcSet="https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-100x100.jpg 100w, https://fixedstyle.net/wp-content/uploads/2022/01/change_seat_top-150x150.jpg 150w" sizes="(max-width: 100px) 100vw, 100px" width="100" height="100" />
            <p>サドル(シート)の交換</p>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default PrevNext