import React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


        const usePasswordToggleSignUp = () => {
            const [visible, setVisiblity] = useState(false);
        
            const Icon = (
                <VisibilityOutlinedIcon
                    icon={visible ? "eye-slash" : "eye"}
                    onClick={() => setVisiblity(visiblity => !visiblity)}
                />
            );
        
            const InputType = visible ? "text" : "password";
        
            return [InputType, Icon];
    
}



export default usePasswordToggleSignUp;