import { type FC, useEffect, useState } from "react";
import { useInitData, type User } from "@telegram-apps/sdk-react";
import { MdImageNotSupported } from "react-icons/md";
import {
    Banner,
    ButtonCell,
    FixedLayout,
    Image,
    Section,
} from "@telegram-apps/telegram-ui";
import { updateUserClicks } from "@/helpers/clicks.helpers";

const threshold = 10;
const interval = 10000;

export const PlayPage: FC = () => {
    const initData = useInitData();
    const [user, setUser] = useState<User>({
        allowsWriteToPm: false,
        firstName: "",
        id: 0,
        languageCode: "",
        lastName: "",
        username: "",
    });
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        const getUser = () => {
            return initData && initData.user ? setUser(initData.user) : {};
        };
        getUser();

        initData && initData.user && console.log(initData.user);
    }, [initData]);

    useEffect(() => {
        const saveClicks = async () => {
            await updateUserClicks(user.id, clicks);
        };
        if (clicks % threshold === 0) {
            saveClicks();
        }
        const intervalId = setInterval(() => {
            if (clicks > 0) {
                saveClicks();
            }
        }, interval);

        return () => clearInterval(intervalId);
    }, [clicks]);

    return (
        <>
            <FixedLayout vertical="top">
                <Banner
                    before={
                        <Image
                            fallbackIcon={<MdImageNotSupported color="white" />}
                            src={
                                "https://avatars.githubusercontent.com/u/84640980?v=4"
                            }
                            size={48}
                        />
                    }
                    header={`${user.firstName} ${user.lastName}`}
                    subheader={`@${user.username}`}
                    description={`ID: ${user.id}`}
                    type="section"
                />
            </FixedLayout>
            <Section
                header={`Score: ${clicks}`}
                style={{ padding: 10, marginTop: 200 }}
            >
                <ButtonCell
                    onClick={() => setClicks((prev) => (prev += 1))}
                    interactiveAnimation="background"
                    mode="default"
                >
                    click
                </ButtonCell>
            </Section>
        </>
    );
};
