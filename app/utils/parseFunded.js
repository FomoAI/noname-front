export default (funded) => {
   return (
    funded.split('%')[0]
    .slice(funded.split('%')[0].length - 3,funded.split('%')[0].length)
    .split('')
    .filter((v) => isFinite(v))
    .join('')
   )
}