import { useAppSelector } from "../../app/hooks";
import { selectAccessToken, selectAccount, selectChainId, selectDappName, selectEmail, selectEns, selectFirstName, selectLastName, selectPermissionFlags, selectStartDate } from "./userSlice";

export const useWeb3Data = () => {

    return {
        account: useAppSelector(selectAccount),
        dappName: useAppSelector(selectDappName),
        permissionFlags: useAppSelector(selectPermissionFlags),
        email: useAppSelector(selectEmail),
        firstName: useAppSelector(selectFirstName),
        lastName: useAppSelector(selectLastName),
        ens: useAppSelector(selectEns),
        startDate: useAppSelector(selectStartDate),
        chainId: useAppSelector(selectChainId),
        accessToken: useAppSelector(selectAccessToken),
    }
}

export default useWeb3Data;
