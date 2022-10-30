import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NotArbiter from "../../components/NotArbiter";
import RenderOnArbiter from "../../components/RenderOnArbiter";
import Meta from "../../components/seo/Meta";
import SmartLink from "../../components/SmartLink";
import Unauthorized from "../../components/Unauthorized";
import { useResolutioContext } from "../../context/ResolutioContext";
import { DisputePool } from "../../integrations/DisputePool";
const DisputeDetails = () => {
  const router = useRouter();
  const { address } = useResolutioContext();
  const { id } = router.query;
  const [dispute, setDispute] = useState({
    title: "",
    description: "",
    hasStaked: false,
    arbiterCount: 0,
    createdAt: "",
    creator: "",
    disputeId: "",
    disputePool: [],
    selectedArbiters: [],
    state: 0,
    uri: "",
    winningProposal: 0,
    additionalDetails: [],
  });

  useEffect(() => {
    const asyncGetDisputeById = async () => {
      if (!id) return;
      const disputeSystem = new DisputePool();
      const dispute = await disputeSystem.getDisputeById(id);
      const {
        arbiterCount,
        createdAt,
        creator,
        disputeId,
        disputePool,
        selectedArbiters,
        state,
        uri,
        winningProposal,
      } = dispute;
      const data = await (await fetch(`${dispute.uri}/formData.json`)).json();
      setDispute({
        title: "",
        description: "",
        hasStaked: disputePool.includes(address),
        arbiterCount,
        createdAt,
        creator,
        disputeId,
        disputePool,
        selectedArbiters,
        state,
        uri,
        winningProposal,
        additionalDetails: data,
      });
    };
    asyncGetDisputeById();
  }, [address, id]);

  return (
    <>
      <Meta title="Dispute Details" />
      <RenderOnArbiter>
        <Card sx={{ my: 4 }}>
          <CardContent>
            <Box>
              <Typography
                variant="h1"
                sx={{ textAlign: "center" }}
              >{`Case Id: ${id}`}</Typography>
              <Box>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Victim’s comic, which was first published on their social
                  media page in 2020, was allegedly minted as an NFT by another
                  on 13 Feb 2022.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Victim:</strong> {dispute.creator}
                </Typography>
                {dispute.additionalDetails.map((data, indx) => {
                  return (
                    <Typography variant="body1" sx={{ mt: 2 }} key={indx}>
                      <strong>{`${data.text}: `}</strong>
                      {data.value}
                    </Typography>
                  );
                })}
              </Box>
              <Box sx={{ mt: 2 }}>
                <SmartLink href={dispute.uri} isExternal={true}>
                  <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
                    Evidence
                  </Button>
                </SmartLink>
                <SmartLink
                  href="https://znreza-blockchain-transaction-search-app-4pp5e7.streamlitapp.com/"
                  isExternal={true}
                >
                  <Button variant="contained" color="secondary">
                    Arbiter Tools
                  </Button>
                </SmartLink>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">
                Would you like to be an arbiter for this case ?
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Stake
              </Button>
            </Box>

            <Box>
              {/*         <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1">VOTE</Typography>
          <CountDownTimer expiryTimestamp={1656530040208} />
          <Box>
            <Button variant="contained" color="secondary" sx={{ mr: 4 }}>
              Invalidate NFT
            </Button>
            <Button variant="contained" color="primary">
              Validate NFT
            </Button>
          </Box>
        </Box> */}
            </Box>
          </CardActions>
        </Card>
      </RenderOnArbiter>
      <NotArbiter />
      <Unauthorized />
    </>
  );
};

export default DisputeDetails;
