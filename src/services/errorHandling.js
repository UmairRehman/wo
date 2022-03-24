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
            }
        }
        else {
            result = await result.json()
            console.log('error', result)
            if (result.message == 'InvalidToken') {
                localStorage.clear()
            }
            return {
                success: false,
                message: result?.message,
            }
        }

    } catch (error) {
        console.log(error)
    }

}

export default ErrorHandling