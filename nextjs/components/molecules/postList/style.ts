import styled from 'styled-components'
import Colors from 'const/styles/colors'

export const PostList = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  dt {
    float: left;
    width: 100px;
    img {
      width: 100px;
    }
  }
  dd {
    padding-left: 115px;
    p {
      font-size: 13px;
      color: #1a1a1a;
      line-height: 18px;
    }
    .kanren-t {
      padding-bottom: 5px;
      a {
        color: #000;
        text-decoration: none;
        font-size: 120%;
        line-height: 1.5;
        font-weight: bold;
        padding-bottom: 5px;
        &:hover {
          color: ${Colors.KEY_COLOR};
        }
      }
    }
  }
  dl {
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-style: dotted;
    border-bottom-color: #ccc;
    position: relative;
    p {
      margin-bottom: 0px;
    }
    &:last-child {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-style: none;
    }
  }
  // TOPとかカテゴリの中央部
  .blog-info p,
  h3 {
    margin: 0 0 5px;
    a {
      color: #666;
      text-decoration: none;
    }
  }
  // media Queries タブレット（600px）以上で適応したいCSS -タブレット・PC
  @media only screen and (min-width: 600px) {
    dd p,
    .no-thumbitiran h3 {
      font-size: 16px;
      line-height: 26px;
    }
    &.pop-box dd h5 {
      font-size: 18px;
      line-height: 27px;
    }
  }
`
