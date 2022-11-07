export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let rasult = []
    for (let i = 0; i < totalPages; i++) {
        rasult.push(i+1)
      }
      return rasult
}