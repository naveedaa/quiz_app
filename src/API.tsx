export const FetchData = async () => {

    const data = await (await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')).json()

    return data.results

}