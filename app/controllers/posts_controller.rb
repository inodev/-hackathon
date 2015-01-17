class PostsController < ApplicationController
  DISPLAY_POSTS = 30

  def index
    @posts = Post.all.limit(DISPLAY_POSTS)
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.story_generate
    if @post.save
      redirect_to @post
    else
      render :new
    end
  end

  private
    def post_params
      params.require(:post).permit(:name, :age, :scale)
    end
end
