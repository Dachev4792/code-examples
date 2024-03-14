export const SearchAndMenu = styled.div<SearchMenuStyledProps>`
  display: flex;
  flex: 1;
  column-gap: 10px;
  align-items: center;
  justify-content: ${({ isRenderMobileIcon, isRenderDesktopSearch }) =>
    isRenderMobileIcon || !isRenderDesktopSearch ? 'flex-end' : 'space-between'};
  height: 60px;
  padding: 0px 10px;
  background-color: ${({ isFadeBackground }) =>
    getColorSchemeStyles(
      isFadeBackground
        ? { light: colors.grey2, dark: colors.grey100 }
        : { light: colors.white, dark: colors.transparent },
    )};
  transition: opacity 1s ease-in-out;
  & a {
    & img {
      position: absolute;
      top: 17px;
      left: 25px;
      height: 24.5px;
    }
  }
`;

export const Wrapper = styled.header<HeaderStyledProps>`
  position: ${({ isNotFixed }) => (isNotFixed ? 'initial' : 'fixed')};
  z-index: ${({ isOpenListenersTrack }) =>
    isOpenListenersTrack ? 'calc(var(--z-index-header) - 4)' : 'var(--z-index-header)'};
  top: 0;
  right: 0;
  left: ${({ isLongHeader }) => (isLongHeader ? '0px' : '240px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  ${({ isNotFixed }) =>
    isNotFixed &&
    css`
      width: 100%;
    `};
  background: ${getColorSchemeStyles({ light: colors.white, dark: colors.grey88 })};
  > a:not(:first-child) {
    position: absolute;
    right: 10px;
    cursor: pointer;
    @media (min-width: 668px) {
      display: none;
    }
  }
  > div:nth-child(1),
  > :nth-child(1) div {
    margin-left: 25px;
    position: static;
  }
  @media (min-width: 720px) {
    > div:nth-child(1),
    > :nth-child(1) div {
      margin-left: 25px;
    }
  }
  @media (${media.lg}) {
    > :nth-child(1) {
      display: none;
    }
  }
  @media (${media.smMax}) {
    z-index: ${({ isOpenListenersTrack }) =>
      isOpenListenersTrack ? 'calc(var(--z-index-header) - 4)' : 'var(--z-index-header)'};
  }
  @media (${media.lgMax}) {
    left: 0px;
    top: ${({ isHiddenSmartBanner }) => (isHiddenSmartBanner ? '0' : '64')}px;
  }
  @media (${media.mdMax}) {
    position: ${({ isNotFixed }) => (isNotFixed && 'initial') || 'fixed'};
    width: 100%;
    top: ${({ isHiddenSmartBanner }) => (isHiddenSmartBanner ? '0' : '64')}px;
  }
