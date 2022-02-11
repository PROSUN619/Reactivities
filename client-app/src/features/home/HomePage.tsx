import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    //destructuring props from usestore
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginnBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities'></Header>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities
                        </Button>
                    </>

                ) : (
                    // <Button as={Link} to='/login' size='huge' inverted>
                    //     Login
                    // </Button>
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                            Login!
                        </Button>

                        <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
                            Register!
                        </Button>
                    </>
                )

                }
                {/* <Header as='h2' inverted content='Welcome to Reactiviites' />
                <Button as={Link} to='/login' size='huge' inverted >
                    Tak0e me to the Login!
                </Button> */}
            </Container>
        </Segment>
    )
})