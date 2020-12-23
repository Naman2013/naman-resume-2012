import { Button } from "app/modules/new-dashboard/components/button";
import React, { PureComponent } from "react";
import { TestimonialSlider } from "../../common/testimonial-slider";
import "./styles.scss";

export default class TestimonialList extends PureComponent{

    render(){
        const { list } = this.props;
        // const list=[
        //     {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", memberImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-headshot/Vijay-Shankar.jpeg", memberName: "Yvette", memberPlace: "Stafford, United Kindom", memberJoined: "Member Since: 2019", memberLevelImg: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-level-img.svg", memberLevelLabel: "Level", memberLevel: "Copernicus",  badgeList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]},
        //     {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", memberImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-headshot/Yvette-McClean.jpeg", memberName: "Yvette", memberPlace: "Stafford, United Kindom", memberJoined: "Member Since: 2019", memberLevelImg: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-level-img.svg", memberLevelLabel: "Level", memberLevel: "Copernicus",  badgeList: [1,2,3,4,5]},
        //     {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", memberImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-headshot/hema-jayan.jpg", memberName: "Yvette", memberPlace: "Stafford, United Kindom", memberJoined: "Member Since: 2019", memberLevelImg: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-level-img.svg", memberLevelLabel: "Level", memberLevel: "Copernicus",  badgeList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
        //     {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", memberImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-headshot/Divya-Finds-You.jpg", memberName: "Yvette", memberPlace: "Stafford, United Kindom", memberJoined: "Member Since: 2019", memberLevelImg: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-level-img.svg", memberLevelLabel: "Level", memberLevel: "Copernicus",  badgeList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]},
        //     {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", memberImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-headshot/Akangsha-Shaw.jpg", memberName: "Yvette", memberPlace: "Stafford, United Kindom", memberJoined: "Member Since: 2019", memberLevelImg: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-level-img.svg", memberLevelLabel: "Level", memberLevel: "Copernicus",  badgeList: [1,2,3,4,5]},
        //     {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", memberImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-member-img.svg", memberName: "Yvette", memberPlace: "Stafford, United Kindom", memberJoined: "Member Since: 2019", memberLevelImg: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-level-img.svg", memberLevelLabel: "Level", memberLevel: "Copernicus",  badgeList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
        // ];
        return(
            <div>
                {/* <div className="testimonial-list-main">
                    {cardList && cardList.map(card=>(
                        <TestimonialCard
                            card={card}
                        />
                    ))}
                </div> */}
                <TestimonialSlider
                    cardList={list}
                />
                <div className="testimonial-nav-div">
                {/* <Button
                    disabled={true}
                    type={"button"}
                    onClickEvent={null} 
                    text={""}
                    style={"testimonial-left-button"}
                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-left-arrow.svg"}
                />
                <Button
                    type={"button"}
                    onClickEvent={null} 
                    text={""}
                    style={"testimonial-right-button"}
                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-right-arrow.svg"}
                /> */}
                </div>
            </div>
        )
    }
}