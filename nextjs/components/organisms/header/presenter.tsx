import Link from 'next/link'
import { SiteName, Description } from './style'

type Props = {
  description: string
}

const Presenter = ({ description }: Props) => {
  return (
    <header>
      <div id='headbox-bg'>
        <div className='clearfix' id='headbox'>
          <div id='header-l'>
            <SiteName>
              <Link href='/'>
                <a>
                  <img src='/images/logo_dark.png' alt='fixedstyleロゴ' title='fixedstyleロゴ' />
                </a>
              </Link>
            </SiteName>
            <Description>{description}</Description>
          </div>
          アコーディオンメニュー
        </div>
      </div>

      <div id='gazou-wide'>
        カスタムヘッダーメニュー カスタムヘッダー
        <div id='st-headerbox'>
          <div id='st-header'>
            <img src='' height='' width='' alt='' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Presenter
