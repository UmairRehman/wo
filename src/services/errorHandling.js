async function ErrorHandling(result) {

    try {
        console.log(result)

        if (result.status == 200) {
            result = await result.json()
            console.log(result)
            if (!result) {
                throw new Error("No stats record found ")
            }
            console.log('Result Data', result.data);
            // return result
            return {
                success: true,
                message: result,
                data: result.data
            }
        }
        else {
            result = await result.json()
            return {
                success: false,
                message: result?.message,
                data: result?.data
            }
            throw new Error(result?.message);
        }

    } catch (error) {
        console.log("error")
        console.log(error)
    }

}

export default ErrorHandling