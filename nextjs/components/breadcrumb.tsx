const Breadcrumb = () => {
  return (
    <section id="breadcrumb">
      <ol itemScope itemType="http://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
          <a href="https://fixedstyle.net" itemProp="item">
            <span itemProp="name">HOME</span>
          </a> &gt;
          <meta itemProp="position" content="1" />
        </li>
        <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
          <a href="https://fixedstyle.net/customize/" itemProp="item">
            <span itemProp="name">カスタマイズ</span>
          </a> &gt;
          <meta itemProp="position" content="2" />
        </li>
        <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
          <span itemProp="name">サドル(シート)の交換</span>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </section>
  )
}

export default Breadcrumb