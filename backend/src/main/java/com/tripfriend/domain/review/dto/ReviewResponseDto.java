package com.tripfriend.domain.review.dto;

import com.tripfriend.domain.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String title;
    private String content;
    private int rating;
    private Long memberId;
    private String memberName;
    private Long placeId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int commentCount;

    public ReviewResponseDto(Review review, String memberName, int commentCount) {
        this.reviewId = review.getReviewId();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.rating = review.getRating();
        this.memberId = review.getMember().getId();
        this.memberName = memberName;
        this.placeId = review.getPlaceId();
        this.createdAt = review.getCreatedAt();
        this.updatedAt = review.getUpdatedAt();
        this.commentCount = commentCount;
    }
}