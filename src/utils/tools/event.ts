export const listenMousemove = (options: {
  onMoving?: (event: MouseEvent) => void
  onUp?: (event: MouseEvent) => void
}) => {
  const { onMoving = () => {}, onUp = () => {} } = options
  document.onmousemove = (event: MouseEvent): void => {
    onMoving(event)
    document.onmouseup = (): void => {
      onUp(event)
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}