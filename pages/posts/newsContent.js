import React, { useEffect, useState } from "react";
import Image from "next/Image";
import styles from "../../styles/newsFeed.module.css";
import { comment } from "../../Components/Comment";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { host } from "../../Components/URI";
import { likePost } from "../../Components/like";
import useSWR from "swr"

import {FaFacebook, FaRegThumbsUp, FaTrash, FaTrashAlt, FaTwitter, FaWhatsapp} from "react-icons/fa"
import Loader from "react-spinners/HashLoader";

function NewsContent({postDetail}) {
    const [commentText, setcommentText] = useState("")

    const sendComment=()=>{
        let detail = {ref: postDetail[0].ref, text: commentText}
       
        axios.post(`${host}/comments`, detail)
    }

    const {commentData, commentError, commentLoading} = useSWR(`${host}/comments?ref=${postDetail[0].ref}`).mutate()
  return (
   <>
    <div className={`container-fluid ${styles.body}`}>
        <div className="col-lg-11 mx-auto">
            {
                postDetail?

          <section className="row">
            {
                postDetail.map((post, i)=>{
                    return <aside className="col-md-8">
              <div className="p-2">
                <h3 data-toggle="tool-tip" title="News title">{post.desc}</h3>
                <div className="">
                  <Image
                    src={require("../../assets/2.jpg")}
                    className={`${styles.newsImg}`}
                    alt="loading"
                  />
                </div>
                <div className="p-2" style={{ textAlign: "justify", lineHeight: "2rem" }}>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.This is a wider card with supporting text
                  below as a natural lead-in to additional content. This content
                  is a little bit longer.This is a wider card with supporting
                  text below as a natural lead-in to additional content. This
                  content is a little bit longer.
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.This is a wider card with supporting text
                  below as a natural lead-in to additional content. This content
                  is a little bit longer.This is a wider card with supporting
                  text below as a natural lead-in to additional content. This
                  content is a little bit longer.
                </div>
                <section
                  className={`rounded-4 d-flex gap-3 float-end ${styles.icon_container}`}
                >
                  <aside
                    className={`icon rounded-pill border p-2 d-flex align-items-center gap-3`}
                    style={{ cursor: "pointer" }}
                    
                  >
                  <FaRegThumbsUp size={`3vh`}/><span>0</span>
                  </aside>
                  <aside className="icon rounded-circle my-2"> <FaFacebook size={`3vh`} color={`blue`}/></aside>
                  <aside className="icon rounded-circle my-2"><FaWhatsapp size={`3vh`} color={`green`} /></aside>
                  <aside className="icon rounded-circle my-2"><FaTwitter size={`3vh`} color={`blue`} /></aside>
                </section>
              </div>
            </aside>
                })
            }
            <aside className={`col-lg-4 col-md-12 mt-5 ${styles.relatedSection}`}>
              <div>
                <h6>Comment</h6>
                <div className="rounded-3 bg-secondary">
                  <section className="p-2 comment-section ">
                    <div
                      style={{
                        height: "20rem",
                        width: "100%",
                        overflow: "auto",
                      }}
                    >
                      {Array(9)
                        .fill("Comment")
                        .map((item, id) => {
                          return (
                            <div
                              className="rounded-3 bg-success border p-2 my-1"
                              key={id}
                            >
                              <section className="text-light">
                                <p className="my-aut">
                                Yes messi is real ecbiuwtrniwut
                                </p>
                                <span>time</span>
                              </section>
                              <section className="text-end text-light">
                                <span>
                                    <FaTrash size={'2.5vh'} className="text-danger"/>
                                </span>
                               
                              </section>
                            </div>
                          );
                        })}
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="Type your comment here"
                        onChange={(e) => setcommentText(e.target.value)}
                        value={commentText}
                      />
                      <button
                        type="button"
                        className={`rounded-3 btn btn-primary col-12 ${
                          !!!commentText && "disabled"
                        }`}
                        onClick={()=>sendComment()}
                      >
                        Comment
                      </button>
                    </div>
                  </section>
                </div>
                <div className="mt-3">
                  <h3>Related News</h3>
                  <div>
                    {Array(9)
                      .fill("Related New")
                      .map((item, index) => (
                        <div key={index}>
                          <section className="d-flex border-bottom my-2 ">
                            <Image
                              src={require("../../assets/1.jpg")}
                              width={100}
                              height={100}
                              alt="loading"
                            />
                            <span>Ronaldo: Is the real Sheep</span>
                          </section>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </section>: 

          <Loader cssOverride={{margin: "3vh auto"}}/>
            }
        </div>
      </div>
      <ToastContainer />
   </>
  )
}

export default NewsContent

export const getServerSideProps= async(context)=>{

    // const gg = context.desc.replace(/ /g, "%20")
    let res = await axios.get(`${host}/posts?desc=${context.query.desc}`)
let data = await res.data

    return {
        props: {
            postDetail : data
        }
    }
}