async function ErrorHandling(result) {

    try {
        if (result.status == 200) {
            result = await result.json()
            if (!result) {
                throw new Error("No stats record found ")
            }
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
        console.log(error)
    }

}

export default ErrorHandling