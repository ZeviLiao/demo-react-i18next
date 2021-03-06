import React, { Component, Suspense } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// import logo from './logo.svg';
import './App.scss';

// use hoc for class based components
class LegacyWelcomeClass extends Component {
  render() {
    const { t, i18n } = this.props;
    return (
    <div>
      <h2>{t('hello')}</h2>
      <h2>{t('superHello',{ someone: 'zz' })}</h2>
    </div>
    ) ;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
}

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Welcome />
        <div>
          <button onClick={() => changeLanguage('zh')}>zh</button> &nbsp; &nbsp;
          <button onClick={() => changeLanguage('en')}>en</button>
        </div>

      </div>
      <div className="App-intro">
        <MyComponent />
      </div>
      <div>{t('description.part2')}</div>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}