
export const getUserFromToken = () => {

    const token = localStorage.getItem("token")

    if (!token) {
        return null
    }

    try {

        const payload= JSON.parse(
            atob(token.split(".")[1]))

            return {
                userName : payload.sub,
                role:payload.role
            }

    }
    catch (error) {

        console.error ("Inavalid JWT " , error);

        return null
    }


}