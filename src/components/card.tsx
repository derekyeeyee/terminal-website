import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__img"><svg xmlns="http://www.w3.org/2000/svg" width="100%"><rect fill="#ffffff" width={540} height={450} /><defs><linearGradient id="a" gradientUnits="userSpaceOnUse" x1={0} x2={0} y1={0} y2="100%" gradientTransform="rotate(222,648,379)"><stop offset={0} stopColor="#ffffff" /><stop offset={1} stopColor="#FC726E" /></linearGradient><pattern patternUnits="userSpaceOnUse" id="b" width={300} height={250} x={0} y={0} viewBox="0 0 1080 900"><g fillOpacity="0.5"><polygon fill="#444" points="90 150 0 300 180 300" /><polygon points="90 150 180 0 0 0" /><polygon fill="#AAA" points="270 150 360 0 180 0" /><polygon fill="#DDD" points="450 150 360 300 540 300" /><polygon fill="#999" points="450 150 540 0 360 0" /><polygon points="630 150 540 300 720 300" /><polygon fill="#DDD" points="630 150 720 0 540 0" /><polygon fill="#444" points="810 150 720 300 900 300" /><polygon fill="#FFF" points="810 150 900 0 720 0" /><polygon fill="#DDD" points="990 150 900 300 1080 300" /><polygon fill="#444" points="990 150 1080 0 900 0" /><polygon fill="#DDD" points="90 450 0 600 180 600" /><polygon points="90 450 180 300 0 300" /><polygon fill="#666" points="270 450 180 600 360 600" /><polygon fill="#AAA" points="270 450 360 300 180 300" /><polygon fill="#DDD" points="450 450 360 600 540 600" /><polygon fill="#999" points="450 450 540 300 360 300" /><polygon fill="#999" points="630 450 540 600 720 600" /><polygon fill="#FFF" points="630 450 720 300 540 300" /><polygon points="810 450 720 600 900 600" /><polygon fill="#DDD" points="810 450 900 300 720 300" /><polygon fill="#AAA" points="990 450 900 600 1080 600" /><polygon fill="#444" points="990 450 1080 300 900 300" /><polygon fill="#222" points="90 750 0 900 180 900" /><polygon points="270 750 180 900 360 900" /><polygon fill="#DDD" points="270 750 360 600 180 600" /><polygon points="450 750 540 600 360 600" /><polygon points="630 750 540 900 720 900" /><polygon fill="#444" points="630 750 720 600 540 600" /><polygon fill="#AAA" points="810 750 720 900 900 900" /><polygon fill="#666" points="810 750 900 600 720 600" /><polygon fill="#999" points="990 750 900 900 1080 900" /><polygon fill="#999" points="180 0 90 150 270 150" /><polygon fill="#444" points="360 0 270 150 450 150" /><polygon fill="#FFF" points="540 0 450 150 630 150" /><polygon points="900 0 810 150 990 150" /><polygon fill="#222" points="0 300 -90 450 90 450" /><polygon fill="#FFF" points="0 300 90 150 -90 150" /><polygon fill="#FFF" points="180 300 90 450 270 450" /><polygon fill="#666" points="180 300 270 150 90 150" /><polygon fill="#222" points="360 300 270 450 450 450" /><polygon fill="#FFF" points="360 300 450 150 270 150" /><polygon fill="#444" points="540 300 450 450 630 450" /><polygon fill="#222" points="540 300 630 150 450 150" /><polygon fill="#AAA" points="720 300 630 450 810 450" /><polygon fill="#666" points="720 300 810 150 630 150" /><polygon fill="#FFF" points="900 300 810 450 990 450" /><polygon fill="#999" points="900 300 990 150 810 150" /><polygon points="0 600 -90 750 90 750" /><polygon fill="#666" points="0 600 90 450 -90 450" /><polygon fill="#AAA" points="180 600 90 750 270 750" /><polygon fill="#444" points="180 600 270 450 90 450" /><polygon fill="#444" points="360 600 270 750 450 750" /><polygon fill="#999" points="360 600 450 450 270 450" /><polygon fill="#666" points="540 600 630 450 450 450" /><polygon fill="#222" points="720 600 630 750 810 750" /><polygon fill="#FFF" points="900 600 810 750 990 750" /><polygon fill="#222" points="900 600 990 450 810 450" /><polygon fill="#DDD" points="0 900 90 750 -90 750" /><polygon fill="#444" points="180 900 270 750 90 750" /><polygon fill="#FFF" points="360 900 450 750 270 750" /><polygon fill="#AAA" points="540 900 630 750 450 750" /><polygon fill="#FFF" points="720 900 810 750 630 750" /><polygon fill="#222" points="900 900 990 750 810 750" /><polygon fill="#222" points="1080 300 990 450 1170 450" /><polygon fill="#FFF" points="1080 300 1170 150 990 150" /><polygon points="1080 600 990 750 1170 750" /><polygon fill="#666" points="1080 600 1170 450 990 450" /><polygon fill="#DDD" points="1080 900 1170 750 990 750" /></g></pattern></defs><rect x={0} y={0} fill="url(#a)" width="100%" height="100%" /><rect x={0} y={0} fill="url(#b)" width="100%" height="100%" /></svg></div>
        <div className="card__avatar"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx={64} cy={64} fill="#ff8475" r={60} /><circle cx={64} cy={64} fill="#f85565" opacity=".4" r={48} /><path d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" fill="#7f3838" /><path d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z" fill="#393c54" opacity=".4" /><circle cx={89} cy={65} fill="#fbc0aa" r={7} /><path d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z" fill="#4bc190" /><path d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z" fill="#356cb6" opacity=".3" /><path d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z" fill="#356cb6" opacity=".3" /><path d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z" fill="#fff" /><path d="m64 88.75v9.75" fill="none" stroke="#fbc0aa" strokeLinecap="round" strokeLinejoin="round" strokeWidth={14} /><circle cx={39} cy={65} fill="#fbc0aa" r={7} /><path d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" fill="#ffd8c9" /><path d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z" fill="#bc5b57" /><path d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5" style={{fill: 'none', strokeLinecap: 'round', stroke: '#fff', strokeMiterlimit: 10, strokeWidth: 2, opacity: '.1'}} /><path d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3" style={{fill: 'none', strokeLinecap: 'round', stroke: '#fff', strokeMiterlimit: 10, strokeWidth: 2, opacity: '.1'}} /><circle cx={76} cy="62.28" fill="#515570" r={3} /><circle cx={52} cy="62.28" fill="#515570" r={3} /><ellipse cx="50.42" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98" /><ellipse cx="77.58" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98" /><g fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m64 67v4" stroke="#fbc0aa" strokeWidth={4} /><path d="m55 56h-9.25" opacity=".2" stroke="#515570" strokeWidth={2} /><path d="m82 56h-9.25" opacity=".2" stroke="#515570" strokeWidth={2} /></g><path d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z" fill="#f85565" opacity=".4" /><path d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z" fill="#f85565" /></svg></div>
        <div className="card__title">Cameron Williamson</div>
        <div className="card__subtitle">Web Development</div>
        <div className="card__wrapper">
          <button className="card__btn">Button</button>
          <button className="card__btn card__btn-solid">Button</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858F;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    width: 300px;
    height: 384px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: var(--bg-color);
  }

  .card__img {
    height: 192px;
    width: 100%;
  }

  .card__img svg {
    height: 100%;
    border-radius: 20px 20px 0 0;
  }

  .card__avatar {
    position: absolute;
    width: 114px;
    height: 114px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 57px);
  }

  .card__avatar svg {
    width: 100px;
    height: 100px;
  }

  .card__title {
    margin-top: 60px;
    font-weight: 500;
    font-size: 18px;
    color: var(--main-color);
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 15px;
    color: var(--submain-color);
  }

  .card__btn {
    margin-top: 15px;
    width: 76px;
    height: 31px;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    font-weight: 700;
    font-size: 11px;
    color: var(--main-color);
    background: var(--bg-color);
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .card__btn-solid {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn:hover {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn-solid:hover {
    background: var(--bg-color);
    color: var(--main-color);
  }`;

export default Card;
