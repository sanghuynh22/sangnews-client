import React, { useState, useEffect, useCallback, useMemo } from "react";
import Web3 from "web3";
import SimCoin from "../utils/SimCoin.json";
import { MetaMaskAvatar } from "react-metamask-avatar"; // add a semicolon here
import Header from "./Header";
import simcoin from "../assets/simcoin.jpeg";
import simcoin2 from "../assets/simcoin2.jpeg";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../actions/user/getAllUser";
import { updateCoinsUser } from "../actions/user/updateCoins";
import { soliditySha3 } from "web3-utils";
const Coin = () => {
	const dispatch = useDispatch();
	const [transactions, setTransactions] = useState<any>([]);
	const [web3, setWeb3] = useState<any>(null);
	const [myToken, setMyToken] = useState<any>(null);
	const [account, setAccount] = useState<string>("");
	const [balance, setBalance] = useState<number>(0);
	const [toAddress, setToAddress] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
	const { userList } = useSelector((state: any) => state.user.getAllUser);
	const { currentUser } = useSelector((state: any) => state.user.currentUser);

	const CONTRACT_ADDRESS: string = process.env
		.REACT_APP_CONTRACT_ADDRESS as string;
	const PRIVATE_KEY: string = process.env.REACT_APP_PRIVATE_KEY as string;
	const OWNER_ADDRESS: string = process.env.REACT_APP_OWNER_ADDRESS as string;

	const getAccountInfo = useCallback(
		async function () {
			if (web3) {
				console.log("run getAccountInfo!");
				console.log("web3: ", web3);
				const currentNetwork = await web3.eth.net.getId();
				console.log("network: ", currentNetwork);
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0]);
				console.log("accounts: ", accounts);
				const myTokenContract = new web3.eth.Contract(
					SimCoin,
					CONTRACT_ADDRESS
				);
				setMyToken(myTokenContract);

				const balance = await myTokenContract.methods
					.balanceOf(accounts[0])
					.call();
				setBalance(balance);

				console.log("balance: ", balance);
				if (currentNetwork != "11155111") {
					alert("Please switch to the Sepolia network to use this application");
					return;
				}
			}
		},
		[web3]
	);
	async function fetchTransactions() {
		if (myToken && account) {
			const events = await myToken.getPastEvents("Transfer", {
				filter: {
					$or: [{ from: account }, { to: account }],
				},
				fromBlock: 0,
				toBlock: "latest",
			});
			console.log("events: ", events);
			const sortEvents = events.sort((a: any, b: any) => {
				const blockNumA = Number(a.blockNumber);
				const blockNumB = Number(b.blockNumber);
				return blockNumB - blockNumA;
			});
			const transactions = sortEvents
				.map((event: any) => {
					return {
						from: event.returnValues.from,
						to: event.returnValues.to,
						amount: event.returnValues.value,
					};
				})
				.filter(
					(tx: any) =>
						tx.from.toLowerCase() === account.toLowerCase() ||
						tx.to.toLowerCase() === account.toLowerCase()
				);
			console.log("transactions: ", transactions);
			setTransactions(transactions);
		}
	}
	async function initWeb3() {
		if ((window as any).ethereum) {
			try {
				await (window as any).ethereum.request({
					method: "eth_requestAccounts",
				});
				const _web3 = new Web3((window as any).ethereum);
				console.log("_web3: ", _web3);
				setWeb3(_web3);
			} catch (error) {
				console.error(error);
			}
		} else if ((window as any).web3) {
			const _web3 = new Web3((window as any).web3.currentProvider);
			setWeb3(_web3);
		} else {
			console.log(
				"Non-Ethereum browser detected. You should consider trying MetaMask!"
			);
		}
	}

	useEffect(() => {
		if (web3) {
			(window as any).ethereum.on(
				"accountsChanged",
				function (accounts: string[]) {
					getAccountInfo();
				}
			);
		}
	}, [web3]);

	useEffect(() => {
		if (web3) {
			getAccountInfo();
		}
	}, [getAccountInfo]);
	useEffect(() => {
		dispatch(getAllUser()).then(() => {});
	}, []);
	useEffect(() => {
		fetchTransactions();
	}, [myToken, account, getAccountInfo]);
	async function handleTransfer() {
		if (myToken && toAddress && amount) {
			try {
				setIsPending(true);
				await myToken.methods
					.transfer(toAddress, amount)
					.send({ from: account });
				const newBalance = await myToken.methods.balanceOf(account).call();
				setBalance(newBalance);

				setAmount(0);
				setToAddress("");
				setIsPending(false);

				fetchTransactions();
			} catch (error) {
				console.error(error);
				setIsPending(false);
				alert(`Failed to transfer SimCoin`);
			}
		}
	}
	const findUser = useMemo<any>(() => {
		try {
			const newUser = userList?.find(
				(user: any) => user.id === currentUser.userId
			);
			return newUser;
		} catch (error) {
			console.error(error);
			return null;
		}
	}, [userList, currentUser]);
	const handleClickWithDraw = async () => {
		const amount = await findUser.coins;
		if (amount > 0) {
			setIsWithdrawing(true);
			try {
				const nonce = await myToken.methods.nonce().call();
				const message = soliditySha3(
					{ type: "address", value: CONTRACT_ADDRESS },
					{ type: "address", value: account },
					{ type: "uint256", value: amount },
					{ type: "uint256", value: nonce }
				);

				const signature = web3.eth.accounts.sign(
					message,
					PRIVATE_KEY
				).signature;

				await myToken.methods
					.withdraw(account, amount, signature)
					.send({ from: account });

				dispatch(updateCoinsUser(0, currentUser.userId)).then(() => {
					dispatch(getAllUser());
					setIsWithdrawing(false);
					getAccountInfo();
				});
			} catch (error) {
				console.error(error);
				setIsWithdrawing(false);
				alert(`Failed to Withdraw SimCoin`);
			}
		} else {
			alert(`bạn cần làm thêm nhiệm vụ `);
		}
	};
	return (
		<div className="container_coin">
			<Header />
			<div className="coin">
				<>
					<div className="coin_header">
						<div className="coin_header_info">
							{findUser && (
								<div className="coin_header_info_container">
									<p className="coin_header_info_p">
										{findUser.name}: {findUser.coins}
									</p>
									<img src={simcoin2} className="coin_avatar" />
								</div>
							)}
							{account && (
								<div className="coin_gift" onClick={handleClickWithDraw}>
									{isWithdrawing ? (
										<ClipLoader color="#fff" size={25} />
									) : (
										<p className="coin_gift_p">Rút SimCoin về ví</p>
									)}
								</div>
							)}
						</div>
						<div className="coin_header_right_container">
							{web3 ? (
								<>
									<div className="coin_header_left">
										<MetaMaskAvatar className="coin_avatar" address={account} />
										<p className="coin_header_p">
											Wallet Address: {account.slice(0, 5)}...
											{account.slice(-4)}
										</p>
									</div>
									<div className="coin_header_right">
										<p>
											Your Private Wallet:{" "}
											{balance ? balance.toLocaleString("de-DE") : 0}
										</p>
										<img src={simcoin2} className="coin_avatar" />
									</div>
								</>
							) : (
								<div className="coin_header_left click" onClick={initWeb3}>
									<p className="coin_header_p">Kết nối với ví metamask</p>
								</div>
							)}
						</div>
					</div>

					<div className={web3 ? "coin_container" : "coin_container none"}>
						{isPending ? (
							<BeatLoader
								color="#0f55a5"
								style={{ margin: "auto" }}
								speedMultiplier={0.5}
								size={20}
							/>
						) : (
							<>
								<h2>Giao dịch SimCoin</h2>
								<div className="coin_input_container">
									<label>To Address:</label>
									<input
										className="coin_input"
										type="text"
										value={toAddress}
										onChange={(e) => setToAddress(e.target.value)}
									/>
								</div>
								<div className="coin_input_container">
									<label>Amount:</label>
									<input
										className="coin_input"
										type="number"
										step="any"
										value={amount}
										onChange={(e) => setAmount(parseFloat(e.target.value))}
									/>
								</div>
								<button className="coin_transfer" onClick={handleTransfer}>
									Transfer
								</button>
							</>
						)}
					</div>

					<div className="coin_history">
						<h3>Lịch sử giao dịch của ví: </h3>
						<div className="coin_history_container">
							{transactions.map((tx: any, i: any) => (
								<div className="coin_history_option" key={i}>
									{tx.from == OWNER_ADDRESS ? (
										<p>
											{" "}
											Bạn Rút {tx.amount.toString()} SimCoin về ví{" "}
											{tx.to.slice(0, 4)}...
											{tx.to.slice(-4)}{" "}
										</p>
									) : account == tx.from ? (
										<p>
											Bạn gửi {tx.amount.toString()} SimCoin cho ví{" "}
											{tx.to.slice(0, 4)}...
											{tx.to.slice(-4)}
										</p>
									) : (
										<p>
											Bạn nhận được {tx.amount.toString()} từ ví{" "}
											{tx.to.slice(0, 4)}...
											{tx.to.slice(-4)}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				</>
			</div>
		</div>
	);
};

export default Coin;
