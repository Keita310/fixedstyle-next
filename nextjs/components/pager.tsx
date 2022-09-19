const Pager = () => {
  return (
    <div className="st-pagelink"> <span aria-current='page' class='page-numbers current'>1</span> <a class='page-numbers' href='https://fixedstyle.net/page/2/'>2</a> <a class='page-numbers' href='https://fixedstyle.net/page/3/'>3</a> <span className="page-numbers dots">&hellip;</span> <a class='page-numbers' href='https://fixedstyle.net/page/12/'>12</a> <a className="next page-numbers" href="https://fixedstyle.net/page/2/">次へ &raquo;</a> </div>
  )
}

export default Pager